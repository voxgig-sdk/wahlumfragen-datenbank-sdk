// Typed models for the WahlumfragenDatenbank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/core"
)

// GetPollingDatabase is the typed data model for the get_polling_database entity.
type GetPollingDatabase struct {
	Date string `json:"Date"`
	InstituteID string `json:"Institute_ID"`
	MethodID *string `json:"Method_ID,omitempty"`
	ParliamentID string `json:"Parliament_ID"`
	Results map[string]any `json:"Results"`
	SurveyPeriod *map[string]any `json:"Survey_Period,omitempty"`
	SurveyedPersons *int `json:"Surveyed_Persons,omitempty"`
	TaskerID string `json:"Tasker_ID"`
}

// GetPollingDatabaseListMatch is the typed request payload for GetPollingDatabase.ListTyped.
type GetPollingDatabaseListMatch struct {
	Date *string `json:"Date,omitempty"`
	InstituteID *string `json:"Institute_ID,omitempty"`
	MethodID *string `json:"Method_ID,omitempty"`
	ParliamentID *string `json:"Parliament_ID,omitempty"`
	Results *map[string]any `json:"Results,omitempty"`
	SurveyPeriod *map[string]any `json:"Survey_Period,omitempty"`
	SurveyedPersons *int `json:"Surveyed_Persons,omitempty"`
	TaskerID *string `json:"Tasker_ID,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
