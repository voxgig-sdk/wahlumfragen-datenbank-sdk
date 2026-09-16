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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date", "name": "Date", "req": true, "short": "Publication date in ISO 8601 format", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "Institute_ID", "req": true, "short": "ID of the polling institute", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "Method_ID", "req": false, "short": "ID of the polling method", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "Parliament_ID", "req": true, "short": "ID of the parliament", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "Results", "req": true, "short": "Polling results indexed by party ID", "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "Survey_Period", "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "Surveyed_Persons", "req": false, "short": "Number of persons surveyed", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "Tasker_ID", "req": true, "short": "ID of the poll commissioner", "type": "`$STRING`", "index$": 7 }], "name": "get_polling_database", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /", "json": "{\"operationId\":\"getPollingDatabase\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"Author\":{\"description\":\"Creator of the database\",\"example\":\"DAWUM\",\"type\":\"string\"},\"Database\":{\"description\":\"Information about the database\",\"type\":\"object\"},\"Institutes\":{\"additionalProperties\":{\"properties\":{\"Name\":{\"description\":\"Name of the polling institute\",\"example\":\"Forsa\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Collection of polling institutes indexed by ID\",\"type\":\"object\"},\"Last_Update\":{\"description\":\"Last update timestamp in W3C DateTime format\",\"format\":\"date-time\",\"type\":\"string\"},\"License\":{\"properties\":{\"Link\":{\"description\":\"URL to the license\",\"example\":\"https://opendatacommons.org/licenses/odbl/\",\"format\":\"uri\",\"type\":\"string\"},\"Name\":{\"description\":\"Full name of the license\",\"example\":\"ODC Open Database License\",\"type\":\"string\"},\"Shortcut\":{\"description\":\"Short name of the license\",\"example\":\"ODC-ODbL\",\"type\":\"string\"}},\"type\":\"object\"},\"Methods\":{\"additionalProperties\":{\"properties\":{\"Name\":{\"description\":\"Name of the polling method\",\"example\":\"Online\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Collection of polling methods indexed by ID\",\"type\":\"object\"},\"Parliaments\":{\"additionalProperties\":{\"properties\":{\"Election\":{\"description\":\"Name of the election\",\"example\":\"Landtagswahl Nordrhein-Westfalen\",\"type\":\"string\"},\"Name\":{\"description\":\"Full name of the parliament\",\"example\":\"Landtag Nordrhein-Westfalen\",\"type\":\"string\"},\"Shortcut\":{\"description\":\"Short name of the federal state or federal parliament\",\"example\":\"Nordrhein-Westfalen (NRW)\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Collection of parliaments indexed by ID\",\"type\":\"object\"},\"Parties\":{\"additionalProperties\":{\"properties\":{\"Name\":{\"description\":\"Full name of the party\",\"example\":\"Christlich Demokratische Union/Christlich-Soziale Union\",\"type\":\"string\"},\"Shortcut\":{\"description\":\"Abbreviation of the party\",\"example\":\"CDU/CSU\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Collection of political parties indexed by ID\",\"type\":\"object\"},\"Publisher\":{\"description\":\"Domain of the publisher\",\"example\":\"dawum.de\",\"type\":\"string\"},\"Surveys\":{\"description\":\"Array of all polling surveys\",\"items\":{\"properties\":{\"Date\":{\"description\":\"Publication date in ISO 8601 format\",\"example\":\"2023-10-15\",\"format\":\"date\",\"type\":\"string\"},\"Institute_ID\":{\"description\":\"ID of the polling institute\",\"type\":\"string\"},\"Method_ID\":{\"description\":\"ID of the polling method\",\"type\":\"string\"},\"Parliament_ID\":{\"description\":\"ID of the parliament\",\"type\":\"string\"},\"Results\":{\"additionalProperties\":{\"description\":\"Poll result as percentage\",\"format\":\"float\",\"type\":\"number\"},\"description\":\"Polling results indexed by party ID\",\"type\":\"object\"},\"Survey_Period\":{\"properties\":{\"Date_End\":{\"description\":\"End date of the survey period\",\"format\":\"date\",\"type\":\"string\"},\"Date_Start\":{\"description\":\"Start date of the survey period\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"Surveyed_Persons\":{\"description\":\"Number of persons surveyed\",\"example\":1500,\"type\":\"integer\"},\"Tasker_ID\":{\"description\":\"ID of the poll commissioner\",\"type\":\"string\"}},\"required\":[\"Parliament_ID\",\"Institute_ID\",\"Tasker_ID\",\"Results\",\"Date\"],\"type\":\"object\"},\"type\":\"array\"},\"Taskers\":{\"additionalProperties\":{\"properties\":{\"Name\":{\"description\":\"Name of the poll commissioner\",\"example\":\"RTL/ntv\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Collection of poll commissioners indexed by ID\",\"type\":\"object\"}},\"required\":[\"Database\",\"License\",\"Publisher\",\"Author\",\"Last_Update\",\"Parliaments\",\"Institutes\",\"Taskers\",\"Methods\",\"Parties\",\"Surveys\"],\"type\":\"object\"}}},\"description\":\"Successful response containing the complete polling database\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/", "segments": [], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_polling_database", "name__orig": "get_polling_database", "Name": "GetPollingDatabase", "name_": "get_polling_database", "name-": "get-polling-database", "NAME": "GET_POLLING_DATABASE", "index$": 0 }, { "active": true, "entity": "get_polling_database", "key$": "BasicGetPollingDatabaseFlow", "kind": "basic", "name": "BasicGetPollingDatabaseFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "get_polling_database_ref01" } }], "index$": 0 }] }, 'GetPollingDatabase');
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