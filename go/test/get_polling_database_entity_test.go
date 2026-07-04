package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go"
	"github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/core"

	vs "github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/utility/struct"
)

func TestGetPollingDatabaseEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetPollingDatabase(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetPollingDatabaseEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_polling_databaseBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_polling_database." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getPollingDatabaseRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_polling_database", setup.data)))
		var getPollingDatabaseRef01Data map[string]any
		if len(getPollingDatabaseRef01DataRaw) > 0 {
			getPollingDatabaseRef01Data = core.ToMapAny(getPollingDatabaseRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getPollingDatabaseRef01Data

		// LIST
		getPollingDatabaseRef01Ent := client.GetPollingDatabase(nil)
		getPollingDatabaseRef01Match := map[string]any{}

		getPollingDatabaseRef01ListResult, err := getPollingDatabaseRef01Ent.List(getPollingDatabaseRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getPollingDatabaseRef01ListOk := getPollingDatabaseRef01ListResult.([]any)
		if !getPollingDatabaseRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getPollingDatabaseRef01ListResult)
		}

	})
}

func get_polling_databaseBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_polling_database", "GetPollingDatabaseTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_polling_database test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_polling_database test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_polling_database01", "get_polling_database02", "get_polling_database03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID": idmap,
		"WAHLUMFRAGENDATENBANK_TEST_LIVE":      "FALSE",
		"WAHLUMFRAGENDATENBANK_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["WAHLUMFRAGENDATENBANK_TEST_GET_POLLING_DATABASE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WAHLUMFRAGENDATENBANK_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewWahlumfragenDatenbankSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WAHLUMFRAGENDATENBANK_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WAHLUMFRAGENDATENBANK_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
