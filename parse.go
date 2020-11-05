package main

import (
	"fmt"
	"time"

	"github.com/minio/simdjson-go"
)

type Results struct {
	Races     map[string]Race
	Timestamp time.Time
}

type Race struct {
	Name               string
	Votes              int
	TotalExpectedVote  int
	PrecinctsReporting int
	PrecinctsTotal     int
	Candidates         map[string]Candidate
}

type Candidate struct {
	Votes int
}

func parseAllResults(filename string, batchSize int) chan Results {
	ch := make(chan Results, batchSize)

	go func() {
		defer close(ch)

		var pj *simdjson.ParsedJson
		var err error
		for json := range gitReadBatched(filename, batchSize) {
			pj, err = simdjson.Parse(json, pj)
			if err != nil {
				panic(err)
			}
			ch <- parseResultsJson(pj)
		}
	}()

	return ch
}

func parseResultsJson(pj *simdjson.ParsedJson) Results {
	results := Results{
		Races: map[string]Race{},
	}

	iter := pj.Iter()
	iter.Advance()
	if _, _, err := iter.Root(&iter); err != nil {
		panic(err)
	}

	obj, err := iter.Object(nil)
	if err != nil {
		panic(err)
	}

	parseJsonObject(obj, map[string]interface{}{
		"data": func(obj *simdjson.Object) {
			parseJsonObject(obj, map[string]interface{}{
				"races": func(_ *simdjson.Array, obj *simdjson.Object) {
					parseRaceJson(obj, &results)
				},
			})
		},
		"meta": func(obj *simdjson.Object) {
			var timestamp string
			parseJsonObject(obj, map[string]interface{}{
				"timestamp": &timestamp,
			})
			results.Timestamp, err = time.Parse(time.RFC3339, timestamp)
			if err != nil {
				panic(err)
			}
		},
	})

	return results
}

func parseRaceJson(obj *simdjson.Object, results *Results) {
	var key string
	race := Race{
		Candidates: map[string]Candidate{},
	}

	parseJsonObject(obj, map[string]interface{}{
		"state_id":            &key,
		"state_name":          &race.Name,
		"votes":               &race.Votes,
		"precincts_reporting": &race.PrecinctsReporting,
		"precincts_total":     &race.PrecinctsTotal,
		"tot_exp_vote":        &race.TotalExpectedVote,
		"candidates": func(_ *simdjson.Array, obj *simdjson.Object) {
			parseCandidateJson(obj, &race)
		},
	})

	results.Races[key] = race
}

func parseCandidateJson(obj *simdjson.Object, race *Race) {
	var key string
	candidate := Candidate{}

	parseJsonObject(obj, map[string]interface{}{
		"candidate_key": &key,
		"votes":         &candidate.Votes,
	})

	race.Candidates[key] = candidate
}

func parseJsonObject(obj *simdjson.Object, fields map[string]interface{}) {
	var iter simdjson.Iter
	for len(fields) > 0 {
		name, typ, err := obj.NextElement(&iter)
		if err != nil {
			panic(err)
		}
		if typ == simdjson.TypeNone {
			break
		}

		switch v := fields[name].(type) {
		case *string:
			if *v, err = iter.String(); err != nil {
				panic(err)
			}
		case *int:
			tmp, err := iter.Int()
			if err != nil {
				panic(err)
			}
			*v = int(tmp)
		case func(*simdjson.Array, *simdjson.Object):
			arr, err := iter.Array(nil)
			if err != nil {
				panic(err)
			}
			tmp := arr.Iter()
			for tmp.Advance() != simdjson.TypeNone {
				obj, err := tmp.Object(nil)
				if err != nil {
					panic(err)
				}
				v(arr, obj)
			}
		case func(*simdjson.Object):
			obj, err := iter.Object(nil)
			if err != nil {
				panic(err)
			}
			v(obj)
		case nil:
		default:
			panic("invalid type")
		}
		delete(fields, name)
	}
	if len(fields) > 0 {
		panic(fmt.Errorf("missing fields: %+v", fields))
	}
}
