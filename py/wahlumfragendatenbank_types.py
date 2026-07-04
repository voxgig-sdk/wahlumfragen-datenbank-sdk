# Typed models for the WahlumfragenDatenbank SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetPollingDatabase:
    date: str
    institute_id: str
    parliament_id: str
    result: dict
    tasker_id: str
    method_id: Optional[str] = None
    survey_period: Optional[dict] = None
    surveyed_person: Optional[int] = None


@dataclass
class GetPollingDatabaseListMatch:
    date: Optional[str] = None
    institute_id: Optional[str] = None
    method_id: Optional[str] = None
    parliament_id: Optional[str] = None
    result: Optional[dict] = None
    survey_period: Optional[dict] = None
    surveyed_person: Optional[int] = None
    tasker_id: Optional[str] = None


@dataclass
class Metadata:
    pass


@dataclass
class MetadataLoadMatch:
    pass

