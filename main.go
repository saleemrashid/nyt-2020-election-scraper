package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"io"
	"os"
	"os/exec"
	"reflect"
	"strconv"
	"text/template"
	"time"

	"golang.org/x/text/language"
	"golang.org/x/text/message"
)

type resultsStruct struct {
	Data resultsDataStruct `json:"data"`
	Meta resultsMetaStruct `json:"meta"`
}

type resultsDataStruct struct {
	Races []raceStruct `json:"races"`
}

type resultsMetaStruct struct {
	Timestamp time.Time `json:"timestamp"`
}

type raceStruct struct {
	StateId            string            `json:"state_id"`
	StateName          string            `json:"state_name"`
	Votes              int               `json:"votes"`
	PrecinctsReporting int               `json:"precincts_reporting"`
	PrecinctsTotal     int               `json:"precincts_total"`
	TotalExpectedVote  int               `json:"tot_exp_vote"`
	Candidates         []candidateStruct `json:"candidates"`
}

type candidateStruct struct {
	Key   string `json:"candidate_key"`
	Votes int    `json:"votes"`
}

type recordStruct struct {
	Votes              int
	TotalExpectedVote  int
	PrecinctsReporting int
	PrecinctsTotal     int
	BlueVotes          int
	RedVotes           int
}

type templateStruct struct {
	Names      map[string]string
	Timestamps map[string][]time.Time
	Records    map[string][]recordStruct
}

const (
	blueCandidateKey = "bidenj"
	redCandidateKey  = "trumpd"
	templateFilename = "script.js.tmpl"
)

func main() {
	tmpl := template.Must(template.New(templateFilename).Funcs(template.FuncMap{
		"json": func(data interface{}) string {
			out, err := json.Marshal(data)
			if err != nil {
				panic(err)
			}

			return string(out)
		},
		"generateText": func(record recordStruct, votes int, otherVotes int) string {
			var verb string
			var delta int
			if votes > otherVotes {
				verb = "ahead"
				delta = votes - otherVotes
			} else {
				verb = "behind"
				delta = otherVotes - votes
			}
			printer := message.NewPrinter(language.English)
			reportedPercentage := float32(record.Votes*100) / float32(record.TotalExpectedVote)
			outstandingVotes := record.TotalExpectedVote - record.Votes
			requiredPercentage := float32((outstandingVotes+otherVotes-votes)*50) / float32(outstandingVotes)
			precinctPercentage := float32(record.PrecinctsReporting*100) / float32(record.PrecinctsTotal)
			return printer.Sprintf("<b>Votes:</b> %d (of %d)<br>%d votes %s<br>Needs %.1f%% of outstanding votes to win!<br>%.1f%% votes reported, %d outstanding<br>%.1f%% precincts reported (%d of %d)", votes, record.Votes, delta, verb, requiredPercentage, reportedPercentage, outstandingVotes, precinctPercentage, record.PrecinctsReporting, record.PrecinctsTotal)
		},
	}).ParseFiles(templateFilename))

	data := templateStruct{
		Names:      map[string]string{},
		Timestamps: map[string][]time.Time{},
		Records: map[string][]recordStruct{
			"AZ": []recordStruct{},
			"GA": []recordStruct{},
			"NC": []recordStruct{},
			"NV": []recordStruct{},
			"PA": []recordStruct{},
		},
	}
	for results := range parseJsonBatch("results.json", 20) {
		for _, race := range results.Data.Races {
			records := data.Records[race.StateId]
			if records == nil {
				continue
			}
			data.Names[race.StateId] = race.StateName
			if len(records) == 0 {
				data.Timestamps[race.StateId] = []time.Time{}
			}

			var blueCandidate candidateStruct
			var redCandidate candidateStruct
			for _, candidate := range race.Candidates {
				if candidate.Key == blueCandidateKey {
					blueCandidate = candidate
				} else if candidate.Key == redCandidateKey {
					redCandidate = candidate
				}
			}

			record := recordStruct{
				Votes:              race.Votes,
				TotalExpectedVote:  race.TotalExpectedVote,
				PrecinctsReporting: race.PrecinctsReporting,
				PrecinctsTotal:     race.PrecinctsTotal,
				BlueVotes:          blueCandidate.Votes,
				RedVotes:           redCandidate.Votes,
			}
			if len(records) > 0 && reflect.DeepEqual(record, records[len(records)-1]) {
				continue
			}
			data.Timestamps[race.StateId] = append(data.Timestamps[race.StateId], results.Meta.Timestamp)
			data.Records[race.StateId] = append(records, record)
		}
	}
	now := time.Now()
	for stateId, records := range data.Records {
		if len(records) > 0 {
			record := records[len(records)-1]
			data.Timestamps[stateId] = append(data.Timestamps[stateId], now)
			data.Records[stateId] = append(records, record)
		}
	}

	if err := tmpl.Execute(os.Stdout, data); err != nil {
		panic(err)
	}
}

func gitRevList(arg ...string) [][]byte {
	out, err := exec.Command("git", arg...).Output()
	if err != nil {
		panic(err)
	}

	return bytes.Split(bytes.TrimSpace(out), []byte("\n"))
}

func parseJsonBatch(filename string, batchSize int) chan resultsStruct {
	commits := gitRevList("log", "--pretty=%H", "--reverse", "--", filename)
	ch := make(chan resultsStruct, batchSize)

	go func() {
		defer close(ch)

		for i := 0; i < len(commits); i += batchSize {
			end := i + batchSize
			if end > len(commits) {
				end = len(commits)
			}

			for _, data := range readJsonBatch(commits[i:end], filename) {
				var results resultsStruct
				json.Unmarshal(data, &results)
				ch <- results
			}
		}
	}()

	return ch
}

func readJsonBatch(commits [][]byte, filename string) [][]byte {
	cmd := exec.Command("git", "cat-file", "--batch=%(objectsize)", "--buffer")

	stdin, err := cmd.StdinPipe()
	if err != nil {
		panic(err)
	}

	go func() {
		defer stdin.Close()

		tail := []byte(":" + filename + "\n")
		for _, commit := range commits {
			if _, err := stdin.Write(commit); err != nil {
				panic(err)
			}
			if _, err := stdin.Write(tail); err != nil {
				panic(err)
			}
		}
	}()

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		panic(err)
	}
	defer stdout.Close()

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	data := make([][]byte, len(commits))

	buf := bufio.NewReader(stdout)
	for i := 0; i < len(commits); i++ {
		line, err := buf.ReadString('\n')
		if err != nil {
			panic(err)
		}

		n, err := strconv.Atoi(line[:len(line)-1])
		if err != nil {
			panic(err)
		}

		data[i] = make([]byte, n+1)
		if _, err := io.ReadFull(buf, data[i]); err != nil {
			panic(err)
		}
	}

	return data
}
