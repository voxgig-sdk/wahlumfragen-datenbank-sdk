// Typed models for the WahlumfragenDatenbank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GetPollingDatabase is the typed data model for the get_polling_database entity.
type GetPollingDatabase struct {
	Date string `json:"date"`
	InstituteId string `json:"institute_id"`
	MethodId *string `json:"method_id,omitempty"`
	ParliamentId string `json:"parliament_id"`
	Result map[string]any `json:"result"`
	SurveyPeriod *map[string]any `json:"survey_period,omitempty"`
	SurveyedPerson *int `json:"surveyed_person,omitempty"`
	TaskerId string `json:"tasker_id"`
}

// GetPollingDatabaseListMatch is the typed request payload for GetPollingDatabase.ListTyped.
type GetPollingDatabaseListMatch struct {
	Date *string `json:"date,omitempty"`
	InstituteId *string `json:"institute_id,omitempty"`
	MethodId *string `json:"method_id,omitempty"`
	ParliamentId *string `json:"parliament_id,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	SurveyPeriod *map[string]any `json:"survey_period,omitempty"`
	SurveyedPerson *int `json:"surveyed_person,omitempty"`
	TaskerId *string `json:"tasker_id,omitempty"`
}

// Metadata is the typed data model for the metadata entity.
type Metadata struct {
}

// MetadataLoadMatch is the typed request payload for Metadata.LoadTyped.
type MetadataLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
