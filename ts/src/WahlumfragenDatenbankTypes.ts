// Typed models for the WahlumfragenDatenbank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetPollingDatabase {
  date: string
  institute_id: string
  method_id?: string
  parliament_id: string
  result: Record<string, any>
  survey_period?: Record<string, any>
  surveyed_person?: number
  tasker_id: string
}

export interface GetPollingDatabaseListMatch {
  date?: string
  institute_id?: string
  method_id?: string
  parliament_id?: string
  result?: Record<string, any>
  survey_period?: Record<string, any>
  surveyed_person?: number
  tasker_id?: string
}

export interface Metadata {
}

export interface MetadataLoadMatch {
}

