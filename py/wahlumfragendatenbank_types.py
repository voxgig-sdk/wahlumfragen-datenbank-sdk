# Typed models for the WahlumfragenDatenbank SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GetPollingDatabaseRequired(TypedDict):
    date: str
    institute_id: str
    parliament_id: str
    result: dict
    tasker_id: str


class GetPollingDatabase(GetPollingDatabaseRequired, total=False):
    method_id: str
    survey_period: dict
    surveyed_person: int


class GetPollingDatabaseListMatch(TypedDict, total=False):
    date: str
    institute_id: str
    method_id: str
    parliament_id: str
    result: dict
    survey_period: dict
    surveyed_person: int
    tasker_id: str


class Metadata(TypedDict):
    pass


class MetadataLoadMatch(TypedDict):
    pass
