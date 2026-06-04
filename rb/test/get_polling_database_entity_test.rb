# GetPollingDatabase entity test

require "minitest/autorun"
require "json"
require_relative "../WahlumfragenDatenbank_sdk"
require_relative "runner"

class GetPollingDatabaseEntityTest < Minitest::Test
  def test_create_instance
    testsdk = WahlumfragenDatenbankSDK.test(nil, nil)
    ent = testsdk.GetPollingDatabase(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = get_polling_database_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "get_polling_database." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    get_polling_database_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.get_polling_database")))
    get_polling_database_ref01_data = nil
    if get_polling_database_ref01_data_raw.length > 0
      get_polling_database_ref01_data = Helpers.to_map(get_polling_database_ref01_data_raw[0][1])
    end

    # LIST
    get_polling_database_ref01_ent = client.GetPollingDatabase(nil)
    get_polling_database_ref01_match = {}

    get_polling_database_ref01_list_result, err = get_polling_database_ref01_ent.list(get_polling_database_ref01_match, nil)
    assert_nil err
    assert get_polling_database_ref01_list_result.is_a?(Array)

  end
end

def get_polling_database_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "get_polling_database", "GetPollingDatabaseTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WahlumfragenDatenbankSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["get_polling_database01", "get_polling_database02", "get_polling_database03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID" => idmap,
    "WAHLUMFRAGENDATENBANK_TEST_LIVE" => "FALSE",
    "WAHLUMFRAGENDATENBANK_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["WAHLUMFRAGENDATENBANK_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = WahlumfragenDatenbankSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["WAHLUMFRAGENDATENBANK_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["WAHLUMFRAGENDATENBANK_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
