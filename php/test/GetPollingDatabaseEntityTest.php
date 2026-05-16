<?php
declare(strict_types=1);

// GetPollingDatabase entity test

require_once __DIR__ . '/../wahlumfragendatenbank_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GetPollingDatabaseEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = WahlumfragenDatenbankSDK::test(null, null);
        $ent = $testsdk->GetPollingDatabase(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = get_polling_database_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "get_polling_database." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $get_polling_database_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.get_polling_database")));
        $get_polling_database_ref01_data = null;
        if (count($get_polling_database_ref01_data_raw) > 0) {
            $get_polling_database_ref01_data = Helpers::to_map($get_polling_database_ref01_data_raw[0][1]);
        }

        // LIST
        $get_polling_database_ref01_ent = $client->GetPollingDatabase(null);
        $get_polling_database_ref01_match = [];

        [$get_polling_database_ref01_list_result, $err] = $get_polling_database_ref01_ent->list($get_polling_database_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($get_polling_database_ref01_list_result);

    }
}

function get_polling_database_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/get_polling_database/GetPollingDatabaseTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = WahlumfragenDatenbankSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["get_polling_database01", "get_polling_database02", "get_polling_database03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID" => $idmap,
        "WAHLUMFRAGENDATENBANK_TEST_LIVE" => "FALSE",
        "WAHLUMFRAGENDATENBANK_TEST_EXPLAIN" => "FALSE",
        "WAHLUMFRAGENDATENBANK_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["WAHLUMFRAGENDATENBANK_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["WAHLUMFRAGENDATENBANK_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new WahlumfragenDatenbankSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["WAHLUMFRAGENDATENBANK_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["WAHLUMFRAGENDATENBANK_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
