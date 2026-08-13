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
# @!attribute [rw] Date
#   @return [String]
#
# @!attribute [rw] Institute_ID
#   @return [String]
#
# @!attribute [rw] Method_ID
#   @return [String, nil]
#
# @!attribute [rw] Parliament_ID
#   @return [String]
#
# @!attribute [rw] Results
#   @return [Hash]
#
# @!attribute [rw] Survey_Period
#   @return [Hash, nil]
#
# @!attribute [rw] Surveyed_Persons
#   @return [Integer, nil]
#
# @!attribute [rw] Tasker_ID
#   @return [String]
GetPollingDatabase = Struct.new(
  :Date,
  :Institute_ID,
  :Method_ID,
  :Parliament_ID,
  :Results,
  :Survey_Period,
  :Surveyed_Persons,
  :Tasker_ID,
  keyword_init: true
)

# Request payload for GetPollingDatabase#list.
#
# @!attribute [rw] Date
#   @return [String, nil]
#
# @!attribute [rw] Institute_ID
#   @return [String, nil]
#
# @!attribute [rw] Method_ID
#   @return [String, nil]
#
# @!attribute [rw] Parliament_ID
#   @return [String, nil]
#
# @!attribute [rw] Results
#   @return [Hash, nil]
#
# @!attribute [rw] Survey_Period
#   @return [Hash, nil]
#
# @!attribute [rw] Surveyed_Persons
#   @return [Integer, nil]
#
# @!attribute [rw] Tasker_ID
#   @return [String, nil]
GetPollingDatabaseListMatch = Struct.new(
  :Date,
  :Institute_ID,
  :Method_ID,
  :Parliament_ID,
  :Results,
  :Survey_Period,
  :Surveyed_Persons,
  :Tasker_ID,
  keyword_init: true
)

# Metadata entity data model.
class Metadata
end

# Request payload for Metadata#load.
class MetadataLoadMatch
end

