<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility: feature_add

class WahlumfragenDatenbankFeatureAdd
{
    public static function call(WahlumfragenDatenbankContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
