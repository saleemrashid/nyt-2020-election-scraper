package main

import (
	"encoding/json"
	"fmt"

	"golang.org/x/text/language"
	"golang.org/x/text/message"
)

const (
	batchSize       = 50
	resultsFilename = "results.json"
)

var (
	States     = [...]string{"AZ", "GA", "NC", "NV", "PA"}
	Candidates = [...]string{"bidenj", "trumpd"}

	printer = message.NewPrinter(language.English)
)

type raceStruct struct {
	Name       string                      `json:"name"`
	Candidates map[string]*candidateStruct `json:"candidates"`
	Timestamps []int64                     `json:"timestamps"`
}

type candidateStruct struct {
	Percentages []float32 `json:"percentages"`
	MaxSize     int       `json:"maxSize"`
	Sizes       []int     `json:"sizes"`
	Text        []string  `json:"text"`
}

func (m RecordMap) Dump() string {
	races := make(map[string]*raceStruct, len(m))

	for key, records := range m {
		r := &raceStruct{
			Candidates: make(map[string]*candidateStruct, len(Candidates)),
			Timestamps: make([]int64, len(records)),
		}
		races[key] = r

		for _, candidate := range Candidates {
			r.Candidates[candidate] = &candidateStruct{
				MaxSize:     0,
				Sizes:       make([]int, len(records)),
				Percentages: make([]float32, len(records)),
				Text:        make([]string, len(records)),
			}
		}

		for i, record := range records {
			r.Name = record.Race.Name
			r.Timestamps[i] = record.Timestamp.UnixNano() / 1000000

			for _, candidate := range Candidates {
				c := r.Candidates[candidate]
				if i > 0 || len(records) == 1 {
					size := record.DeltaCandidate(candidate)
					c.Sizes[i] = size
					if size > c.MaxSize {
						c.MaxSize = size
					}
				}
				c.Percentages[i] = record.PercentageCandidate(candidate)
				c.Text[i] = record.text(candidate)
			}
		}
	}

	out, err := json.Marshal(races)
	if err != nil {
		panic(err)
	}

	return string(out)
}

func diffPercent(a, b float32) string {
	var prefix string
	var difference float32
	if a > b {
		prefix = "+"
		difference = a - b
	} else {
		prefix = "-"
		difference = b - a
	}
	return printer.Sprintf("%s%.2f%%", prefix, difference*100)
}

func (r *Record) text(candidate string) string {
	if len(Candidates) != 2 {
		panic("more than two candidates")
	}
	otherCandidate := Candidates[0]
	if candidate == otherCandidate {
		otherCandidate = Candidates[1]
	}

	c := r.Race.Candidates[candidate]
	other := r.Race.Candidates[otherCandidate]

	difference := c.Votes - other.Votes
	var verb string
	if difference < 0 {
		difference = -difference
		verb = "behind"
	} else {
		verb = "ahead"
	}

	percent := r.PercentageCandidate(candidate)
	otherPercent := r.PercentageCandidate(otherCandidate)

	var estimate string
	if votes := r.OutstandingVotes(); votes >= 0 {
		estimate = printer.Sprintf("estimated %d outstanding", votes)
	} else {
		estimate = "unknown number of votes outstanding"
	}

	return printer.Sprintf(
		"<b>Votes:</b> %d (%.2f%% of %d)<br>%d votes %s (%s)<br>%.2f%% reported, %s<br>"+
			"<b>Precincts reporting:</b> %d of %d",
		c.Votes, percent*100, r.Race.Votes, difference, verb, diffPercent(percent, otherPercent),
		r.PercentageReportedVotes()*100, estimate,
		r.Race.PrecinctsReporting, r.Race.PrecinctsTotal,
	)
}

func main() {
	recordMap := RecordMap{}

	for results := range parseAllResults(resultsFilename, batchSize) {
		for _, state := range States {
			recordMap.Add(state, results.Races[state], results.Timestamp)
		}
	}

	fmt.Print("const data = ")
	fmt.Println(recordMap.Dump())
}
