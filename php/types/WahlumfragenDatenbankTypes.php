<?php
declare(strict_types=1);

// Typed models for the WahlumfragenDatenbank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetPollingDatabase entity data model. */
class GetPollingDatabase
{
    public string $date;
    public string $institute_id;
    public ?string $method_id = null;
    public string $parliament_id;
    public array $result;
    public ?array $survey_period = null;
    public ?int $surveyed_person = null;
    public string $tasker_id;
}

/** Request payload for GetPollingDatabase#list. */
class GetPollingDatabaseListMatch
{
    public ?string $date = null;
    public ?string $institute_id = null;
    public ?string $method_id = null;
    public ?string $parliament_id = null;
    public ?array $result = null;
    public ?array $survey_period = null;
    public ?int $surveyed_person = null;
    public ?string $tasker_id = null;
}

/** Metadata entity data model. */
class Metadata
{
}

/** Request payload for Metadata#load. */
class MetadataLoadMatch
{
}

