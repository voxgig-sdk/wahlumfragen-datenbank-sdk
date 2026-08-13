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
    public string $Date;
    public string $Institute_ID;
    public ?string $Method_ID = null;
    public string $Parliament_ID;
    public array $Results;
    public ?array $Survey_Period = null;
    public ?int $Surveyed_Persons = null;
    public string $Tasker_ID;
}

/** Request payload for GetPollingDatabase#list. */
class GetPollingDatabaseListMatch
{
    public ?string $Date = null;
    public ?string $Institute_ID = null;
    public ?string $Method_ID = null;
    public ?string $Parliament_ID = null;
    public ?array $Results = null;
    public ?array $Survey_Period = null;
    public ?int $Surveyed_Persons = null;
    public ?string $Tasker_ID = null;
}

/** Metadata entity data model. */
class Metadata
{
}

/** Request payload for Metadata#load. */
class MetadataLoadMatch
{
}

