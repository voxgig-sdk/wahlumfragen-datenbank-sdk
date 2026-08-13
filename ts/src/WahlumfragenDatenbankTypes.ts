// Typed models for the WahlumfragenDatenbank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetPollingDatabase {
  Date: string
  Institute_ID: string
  Method_ID?: string
  Parliament_ID: string
  Results: Record<string, any>
  Survey_Period?: Record<string, any>
  Surveyed_Persons?: number
  Tasker_ID: string
}

export interface GetPollingDatabaseListMatch {
  Date?: string
  Institute_ID?: string
  Method_ID?: string
  Parliament_ID?: string
  Results?: Record<string, any>
  Survey_Period?: Record<string, any>
  Surveyed_Persons?: number
  Tasker_ID?: string
}

export interface Metadata {
}

export interface MetadataLoadMatch {
}

