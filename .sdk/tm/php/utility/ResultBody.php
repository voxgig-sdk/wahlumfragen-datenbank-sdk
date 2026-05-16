<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility: result_body

class WahlumfragenDatenbankResultBody
{
    public static function call(WahlumfragenDatenbankContext $ctx): ?WahlumfragenDatenbankResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
