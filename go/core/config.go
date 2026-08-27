package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WahlumfragenDatenbank",
			"slug": "wahlumfragen-datenbank",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.dawum.de",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_polling_database": map[string]any{},
				"metadata": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_polling_database": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Date",
						"req": true,
						"short": "Publication date in ISO 8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Institute_ID",
						"req": true,
						"short": "ID of the polling institute",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Method_ID",
						"short": "ID of the polling method",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Parliament_ID",
						"req": true,
						"short": "ID of the parliament",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Results",
						"req": true,
						"short": "Polling results indexed by party ID",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "Survey_Period",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "Surveyed_Persons",
						"short": "Number of persons surveyed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Tasker_ID",
						"req": true,
						"short": "ID of the poll commissioner",
						"type": "`$STRING`",
					},
				},
				"name": "get_polling_database",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"metadata": map[string]any{
				"fields": []any{},
				"name": "metadata",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/last_update.txt",
								"parts": []any{
									"last_update.txt",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
