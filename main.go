package main

import (
	"encoding/json"
	"fmt"
	"time"

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
	Name       string                     `json:"name"`
	Candidates map[string]candidateStruct `json:"candidates"`
	Sizes      []int                      `json:"sizes"`
	MaxSize    int                        `json:"maxSize"`
	Timestamps []time.Time                `json:"timestamps"`
}

type candidateStruct struct {
	Percentages []float32 `json:"percentages"`
	Text        []string  `json:"text"`
}

func (m RecordMap) Dump() string {
	races := make(map[string]raceStruct, len(m))

	for key, records := range m {
		race := raceStruct{
			Candidates: make(map[string]candidateStruct, len(Candidates)),
			Sizes:      make([]int, len(records)),
			MaxSize:    0,
			Timestamps: make([]time.Time, len(records)),
		}
		for _, candidate := range Candidates {
			race.Candidates[candidate] = candidateStruct{
				Percentages: make([]float32, len(records)),
				Text:        make([]string, len(records)),
			}
		}

		for i, record := range records {
			race.Name = record.Race.Name
			race.Timestamps[i] = record.Timestamp

			if i > 0 || len(records) == 1 {
				size := record.Delta()
				race.Sizes[i] = size
				if size > race.MaxSize {
					race.MaxSize = size
				}
			}

			for _, candidate := range Candidates {
				race.Candidates[candidate].Percentages[i] = record.PercentageCandidate(candidate)
				race.Candidates[candidate].Text[i] = record.text(candidate)
			}
		}

		races[key] = race
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

	return printer.Sprintf(
		"<b>Votes:</b> %d (%.2f%% of %d)<br>%d votes %s (%s)<br>%.2f%% reported, estimated %d outstanding<br>"+
			"<b>Precincts reporting:</b> %d of %d",
		c.Votes, percent*100, r.Race.Votes, difference, verb, diffPercent(percent, otherPercent),
		r.PercentageReportedVotes()*100, r.OutstandingVotes(),
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
