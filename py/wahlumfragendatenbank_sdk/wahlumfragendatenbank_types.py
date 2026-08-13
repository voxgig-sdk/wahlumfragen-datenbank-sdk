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
    Date: str
    Institute_ID: str
    Parliament_ID: str
    Results: dict
    Tasker_ID: str


class GetPollingDatabase(GetPollingDatabaseRequired, total=False):
    Method_ID: str
    Survey_Period: dict
    Surveyed_Persons: int


class GetPollingDatabaseListMatch(TypedDict, total=False):
    Date: str
    Institute_ID: str
    Method_ID: str
    Parliament_ID: str
    Results: dict
    Survey_Period: dict
    Surveyed_Persons: int
    Tasker_ID: str


class Metadata(TypedDict):
    pass


class MetadataLoadMatch(TypedDict):
    pass
