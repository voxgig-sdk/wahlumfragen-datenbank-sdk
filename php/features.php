<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WahlumfragenDatenbankFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WahlumfragenDatenbankBaseFeature();
            case "test":
                return new WahlumfragenDatenbankTestFeature();
            default:
                return new WahlumfragenDatenbankBaseFeature();
        }
    }
}
