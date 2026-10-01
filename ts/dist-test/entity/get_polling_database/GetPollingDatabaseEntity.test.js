"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetPollingDatabaseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WAHLUMFRAGEN_DATENBANK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WAHLUMFRAGEN_DATENBANK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WahlumfragenDatenbankSDK.test();
        const ent = testsdk.GetPollingDatabase();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WAHLUMFRAGEN_DATENBANK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_polling_database.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "Date": { "a": true, "fo": "date", "h": "Date", "n": "Date", "r": true, "sh": "Publication date in ISO 8601 format", "t": "`$STRING`", "key$": "Date", "index$": 0 }, "Institute_ID": { "a": true, "h": "Institute Id", "n": "Institute_ID", "r": true, "sh": "ID of the polling institute", "t": "`$STRING`", "key$": "Institute_ID", "index$": 1 }, "Method_ID": { "a": true, "h": "Method Id", "n": "Method_ID", "r": false, "sh": "ID of the polling method", "t": "`$STRING`", "key$": "Method_ID", "index$": 2 }, "Parliament_ID": { "a": true, "h": "Parliament Id", "n": "Parliament_ID", "r": true, "sh": "ID of the parliament", "t": "`$STRING`", "key$": "Parliament_ID", "index$": 3 }, "Results": { "a": true, "h": "Results", "n": "Results", "r": true, "sh": "Polling results indexed by party ID", "t": "`$OBJECT`", "key$": "Results", "index$": 4 }, "Survey_Period": { "a": true, "h": "Survey Period", "n": "Survey_Period", "r": false, "t": "`$OBJECT`", "key$": "Survey_Period", "index$": 5 }, "Surveyed_Persons": { "a": true, "h": "Surveyed Persons", "n": "Surveyed_Persons", "r": false, "sh": "Number of persons surveyed", "t": "`$INTEGER`", "key$": "Surveyed_Persons", "index$": 6 }, "Tasker_ID": { "a": true, "h": "Tasker Id", "n": "Tasker_ID", "r": true, "sh": "ID of the poll commissioner", "t": "`$STRING`", "key$": "Tasker_ID", "index$": 7 } }, "name": "get_polling_database", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/", "q": {}, "r": {}, "s": [], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_polling_database", "name__orig": "get_polling_database", "Name": "GetPollingDatabase", "name_": "get_polling_database", "name-": "get-polling-database", "NAME": "GET_POLLING_DATABASE", "index$": 0 }, { "active": true, "entity": "get_polling_database", "key$": "BasicGetPollingDatabaseFlow", "kind": "basic", "name": "BasicGetPollingDatabaseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "get_polling_database_ref01" } }], "index$": 0 }] }, 'GetPollingDatabase', { "GET /": { "protocol": "http", "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_polling_database_ref01_data = Object.values(setup.data.existing.get_polling_database)[0];
        // LIST
        const get_polling_database_ref01_ent = client.GetPollingDatabase();
        const get_polling_database_ref01_match = {};
        const get_polling_database_ref01_list = (await get_polling_database_ref01_ent.list(get_polling_database_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_polling_database/GetPollingDatabaseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WahlumfragenDatenbankSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_polling_database01', 'get_polling_database02', 'get_polling_database03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WAHLUMFRAGEN_DATENBANK_TEST_GET_POLLING_DATABASE_ENTID': idmap,
        'WAHLUMFRAGEN_DATENBANK_TEST_LIVE': 'FALSE',
        'WAHLUMFRAGEN_DATENBANK_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WAHLUMFRAGEN_DATENBANK_TEST_GET_POLLING_DATABASE_ENTID'];
    const live = 'TRUE' === env.WAHLUMFRAGEN_DATENBANK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WAHLUMFRAGEN_DATENBANK_TEST_GET_POLLING_DATABASE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WahlumfragenDatenbankSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WAHLUMFRAGEN_DATENBANK_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetPollingDatabaseEntity.test.js.map