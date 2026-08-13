-- Typed models for the WahlumfragenDatenbank SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetPollingDatabase
---@field Date string
---@field Institute_ID string
---@field Method_ID? string
---@field Parliament_ID string
---@field Results table
---@field Survey_Period? table
---@field Surveyed_Persons? number
---@field Tasker_ID string

---@class GetPollingDatabaseListMatch
---@field Date? string
---@field Institute_ID? string
---@field Method_ID? string
---@field Parliament_ID? string
---@field Results? table
---@field Survey_Period? table
---@field Surveyed_Persons? number
---@field Tasker_ID? string

---@class Metadata

---@class MetadataLoadMatch

local M = {}

return M
