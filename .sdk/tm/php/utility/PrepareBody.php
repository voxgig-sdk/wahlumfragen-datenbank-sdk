<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility: prepare_body

class WahlumfragenDatenbankPrepareBody
{
    public static function call(WahlumfragenDatenbankContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
