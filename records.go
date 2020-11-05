package main

import (
	"reflect"
	"time"
)

type RecordMap map[string][]Record

type Record struct {
	previous  *Record
	Race      Race
	Timestamp time.Time
}

func (m RecordMap) Add(key string, race Race, timestamp time.Time) {
	records := m[key]
	if records == nil {
		records = []Record{}
	}
	var previous *Record
	if len(records) > 0 {
		previous = &records[len(records)-1]
		if reflect.DeepEqual(&race, &previous.Race) {
			return
		}
		if timestamp.Before(previous.Timestamp) {
			panic("records must be in chronological order")
		}
	}
	m[key] = append(records, Record{
		previous:  previous,
		Race:      race,
		Timestamp: timestamp,
	})
}

func (r *Record) Delta() int {
	previousVotes := 0
	if r.previous != nil {
		previousVotes = r.previous.Race.Votes
	}
	return r.Race.Votes - previousVotes
}

func (r *Record) DeltaCandidate(candidate string) int {
	previousVotes := 0
	if r.previous != nil {
		previousVotes = r.previous.Race.Candidates[candidate].Votes
	}
	return r.Race.Candidates[candidate].Votes - previousVotes
}

func (r *Record) PercentageCandidate(candidate string) float32 {
	return float32(r.Race.Candidates[candidate].Votes) / float32(r.Race.Votes)
}

func (r *Record) PercentageDeltaCandidate(candidate string) float32 {
	return float32(r.DeltaCandidate(candidate)) / float32(r.Delta())
}

func (r *Record) OutstandingVotes() int {
	return r.Race.TotalExpectedVote - r.Race.Votes
}

func (r *Record) PercentageReportedVotes() float32 {
	return float32(r.Race.Votes) / float32(r.Race.TotalExpectedVote)
}
