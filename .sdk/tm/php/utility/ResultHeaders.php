<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility: result_headers

class WahlumfragenDatenbankResultHeaders
{
    public static function call(WahlumfragenDatenbankContext $ctx): ?WahlumfragenDatenbankResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
