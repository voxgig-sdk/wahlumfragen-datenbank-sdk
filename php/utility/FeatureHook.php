<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility: feature_hook

class WahlumfragenDatenbankFeatureHook
{
    public static function call(WahlumfragenDatenbankContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
