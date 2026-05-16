<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WahlumfragenDatenbankMakeContext
{
    public static function call(array $ctxmap, ?WahlumfragenDatenbankContext $basectx): WahlumfragenDatenbankContext
    {
        return new WahlumfragenDatenbankContext($ctxmap, $basectx);
    }
}
