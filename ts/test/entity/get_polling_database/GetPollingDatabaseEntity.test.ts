

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WahlumfragenDatenbankSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetPollingDatabaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WAHLUMFRAGEN_DATENBANK_TEST_LIVE=TRUE.
  afterEach(liveDelay('WAHLUMFRAGEN_DATENBANK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WahlumfragenDatenbankSDK.test()
    const ent = testsdk.GetPollingDatabase()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WAHLUMFRAGEN_DATENBANK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_polling_database.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Date":{"a":true,"fo":"date","h":"Date","n":"Date","r":true,"sh":"Publication date in ISO 8601 format","t":"`$STRING`","key$":"Date","index$":0},"Institute_ID":{"a":true,"h":"Institute Id","n":"Institute_ID","r":true,"sh":"ID of the polling institute","t":"`$STRING`","key$":"Institute_ID","index$":1},"Method_ID":{"a":true,"h":"Method Id","n":"Method_ID","r":false,"sh":"ID of the polling method","t":"`$STRING`","key$":"Method_ID","index$":2},"Parliament_ID":{"a":true,"h":"Parliament Id","n":"Parliament_ID","r":true,"sh":"ID of the parliament","t":"`$STRING`","key$":"Parliament_ID","index$":3},"Results":{"a":true,"h":"Results","n":"Results","r":true,"sh":"Polling results indexed by party ID","t":"`$OBJECT`","key$":"Results","index$":4},"Survey_Period":{"a":true,"h":"Survey Period","n":"Survey_Period","r":false,"t":"`$OBJECT`","key$":"Survey_Period","index$":5},"Surveyed_Persons":{"a":true,"h":"Surveyed Persons","n":"Surveyed_Persons","r":false,"sh":"Number of persons surveyed","t":"`$INTEGER`","key$":"Surveyed_Persons","index$":6},"Tasker_ID":{"a":true,"h":"Tasker Id","n":"Tasker_ID","r":true,"sh":"ID of the poll commissioner","t":"`$STRING`","key$":"Tasker_ID","index$":7}},"name":"get_polling_database","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_polling_database","name__orig":"get_polling_database","Name":"GetPollingDatabase","name_":"get_polling_database","name-":"get-polling-database","NAME":"GET_POLLING_DATABASE","index$":0}, {"active":true,"entity":"get_polling_database","key$":"BasicGetPollingDatabaseFlow","kind":"basic","name":"BasicGetPollingDatabaseFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_polling_database_ref01"}}],"index$":0}]}, 'GetPollingDatabase', {"GET /":{"protocol":"http","operationId":"getPollingDatabase","responses":{"200":{"description":"Successful response containing the complete polling database","content":{"application/json":{"schema":{"type":"object","properties":{"Database":{"description":"Information about the database","key$":"Database","type":"object","x-ref":"#/components/schemas/DatabaseInfo"},"License":{"key$":"License","properties":{"Link":{"description":"URL to the license","example":"https://opendatacommons.org/licenses/odbl/","format":"uri","type":"string"},"Name":{"description":"Full name of the license","example":"ODC Open Database License","type":"string"},"Shortcut":{"description":"Short name of the license","example":"ODC-ODbL","type":"string"}},"type":"object","x-ref":"#/components/schemas/License"},"Publisher":{"description":"Domain of the publisher","example":"dawum.de","key$":"Publisher","type":"string"},"Author":{"description":"Creator of the database","example":"DAWUM","key$":"Author","type":"string"},"Last_Update":{"description":"Last update timestamp in W3C DateTime format","format":"date-time","key$":"Last_Update","type":"string"},"Parliaments":{"additionalProperties":{"properties":{"Election":{"description":"Name of the election","example":"Landtagswahl Nordrhein-Westfalen","type":"string"},"Name":{"description":"Full name of the parliament","example":"Landtag Nordrhein-Westfalen","type":"string"},"Shortcut":{"description":"Short name of the federal state or federal parliament","example":"Nordrhein-Westfalen (NRW)","type":"string"}},"type":"object","x-ref":"#/components/schemas/Parliament"},"description":"Collection of parliaments indexed by ID","key$":"Parliaments","type":"object"},"Institutes":{"additionalProperties":{"properties":{"Name":{"description":"Name of the polling institute","example":"Forsa","type":"string"}},"type":"object","x-ref":"#/components/schemas/Institute"},"description":"Collection of polling institutes indexed by ID","key$":"Institutes","type":"object"},"Taskers":{"additionalProperties":{"properties":{"Name":{"description":"Name of the poll commissioner","example":"RTL/ntv","type":"string"}},"type":"object","x-ref":"#/components/schemas/Tasker"},"description":"Collection of poll commissioners indexed by ID","key$":"Taskers","type":"object"},"Methods":{"additionalProperties":{"properties":{"Name":{"description":"Name of the polling method","example":"Online","type":"string"}},"type":"object","x-ref":"#/components/schemas/Method"},"description":"Collection of polling methods indexed by ID","key$":"Methods","type":"object"},"Parties":{"additionalProperties":{"properties":{"Name":{"description":"Full name of the party","example":"Christlich Demokratische Union/Christlich-Soziale Union","type":"string"},"Shortcut":{"description":"Abbreviation of the party","example":"CDU/CSU","type":"string"}},"type":"object","x-ref":"#/components/schemas/Party"},"description":"Collection of political parties indexed by ID","key$":"Parties","type":"object"},"Surveys":{"description":"Array of all polling surveys","items":{"properties":{"Date":{"description":"Publication date in ISO 8601 format","example":"2023-10-15","format":"date","type":"string","key$":"Date"},"Institute_ID":{"description":"ID of the polling institute","type":"string","key$":"Institute_ID"},"Method_ID":{"description":"ID of the polling method","type":"string","key$":"Method_ID"},"Parliament_ID":{"description":"ID of the parliament","type":"string","key$":"Parliament_ID"},"Results":{"additionalProperties":{"description":"Poll result as percentage","format":"float","type":"number"},"description":"Polling results indexed by party ID","type":"object","key$":"Results"},"Survey_Period":{"properties":{"Date_End":{"description":"End date of the survey period","format":"date","type":"string"},"Date_Start":{"description":"Start date of the survey period","format":"date","type":"string"}},"type":"object","x-ref":"#/components/schemas/SurveyPeriod","key$":"Survey_Period"},"Surveyed_Persons":{"description":"Number of persons surveyed","example":1500,"type":"integer","key$":"Surveyed_Persons"},"Tasker_ID":{"description":"ID of the poll commissioner","type":"string","key$":"Tasker_ID"}},"required":["Parliament_ID","Institute_ID","Tasker_ID","Results","Date"],"type":"object","x-ref":"#/components/schemas/Survey","index$":0},"key$":"Surveys","type":"array"}},"required":["Database","License","Publisher","Author","Last_Update","Parliaments","Institutes","Taskers","Methods","Parties","Surveys"],"x-ref":"#/components/schemas/PollingDatabase"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_polling_database_ref01_data = Object.values(setup.data.existing.get_polling_database)[0] as any

    // LIST
    const get_polling_database_ref01_ent = client.GetPollingDatabase()
    const get_polling_database_ref01_match: any = {}

    const get_polling_database_ref01_list = (await get_polling_database_ref01_ent.list(get_polling_database_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_polling_database/GetPollingDatabaseTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WahlumfragenDatenbankSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_polling_database01','get_polling_database02','get_polling_database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WAHLUMFRAGEN_DATENBANK_TEST_GET_POLLING_DATABASE_ENTID': idmap,
    'WAHLUMFRAGEN_DATENBANK_TEST_LIVE': 'FALSE',
    'WAHLUMFRAGEN_DATENBANK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WAHLUMFRAGEN_DATENBANK_TEST_GET_POLLING_DATABASE_ENTID']

  const live = 'TRUE' === env.WAHLUMFRAGEN_DATENBANK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WAHLUMFRAGEN_DATENBANK_TEST_GET_POLLING_DATABASE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WahlumfragenDatenbankSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
