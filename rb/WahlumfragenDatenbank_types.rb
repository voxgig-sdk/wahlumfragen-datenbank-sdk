# frozen_string_literal: true

# Typed models for the WahlumfragenDatenbank SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetPollingDatabase entity data model.
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] institute_id
#   @return [String]
#
# @!attribute [rw] method_id
#   @return [String, nil]
#
# @!attribute [rw] parliament_id
#   @return [String]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] survey_period
#   @return [Hash, nil]
#
# @!attribute [rw] surveyed_person
#   @return [Integer, nil]
#
# @!attribute [rw] tasker_id
#   @return [String]
GetPollingDatabase = Struct.new(
  :date,
  :institute_id,
  :method_id,
  :parliament_id,
  :result,
  :survey_period,
  :surveyed_person,
  :tasker_id,
  keyword_init: true
)

# Match filter for GetPollingDatabase#list (any subset of GetPollingDatabase fields).
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] institute_id
#   @return [String, nil]
#
# @!attribute [rw] method_id
#   @return [String, nil]
#
# @!attribute [rw] parliament_id
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] survey_period
#   @return [Hash, nil]
#
# @!attribute [rw] surveyed_person
#   @return [Integer, nil]
#
# @!attribute [rw] tasker_id
#   @return [String, nil]
GetPollingDatabaseListMatch = Struct.new(
  :date,
  :institute_id,
  :method_id,
  :parliament_id,
  :result,
  :survey_period,
  :surveyed_person,
  :tasker_id,
  keyword_init: true
)

# Metadata entity data model.
class Metadata
end

# Match filter for Metadata#load (any subset of Metadata fields).
class MetadataLoadMatch
end

