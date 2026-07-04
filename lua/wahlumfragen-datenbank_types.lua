-- Typed models for the WahlumfragenDatenbank SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetPollingDatabase
---@field date string
---@field institute_id string
---@field method_id? string
---@field parliament_id string
---@field result table
---@field survey_period? table
---@field surveyed_person? number
---@field tasker_id string

---@class GetPollingDatabaseListMatch

---@class Metadata

---@class MetadataLoadMatch

local M = {}

return M
