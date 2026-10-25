

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WahlumfragenDatenbankSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('MetadataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WAHLUMFRAGEN_DATENBANK_TEST_LIVE=TRUE.
  afterEach(liveDelay('WAHLUMFRAGEN_DATENBANK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WahlumfragenDatenbankSDK.test()
    const ent = testsdk.Metadata()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WAHLUMFRAGEN_DATENBANK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'metadata.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"metadata","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /last_update.txt","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/last_update.txt","q":{},"r":{},"rs":{"kind":"raw","media":"text/plain"},"s":[{"lit":"last_update.txt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"metadata","name__orig":"metadata","Name":"Metadata","name_":"metadata","name-":"metadata","NAME":"METADATA","index$":1}, {"active":true,"entity":"metadata","key$":"BasicMetadataFlow","kind":"basic","name":"BasicMetadataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"metadata_ref01","srcdatavar":"metadata_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-metadata_ref01"}}],"index$":0}]}, 'Metadata', {"GET /last_update.txt":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let metadata_ref01_data = Object.values(setup.data.existing.metadata)[0] as any

    // LOAD
    const metadata_ref01_ent = client.Metadata()
    const metadata_ref01_match_dt0: any = {}
    const metadata_ref01_data_dt0 = (await metadata_ref01_ent.load(metadata_ref01_match_dt0)).data()
    assert(null != metadata_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/metadata/MetadataTestData.json')

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
    ['metadata01','metadata02','metadata03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WAHLUMFRAGEN_DATENBANK_TEST_METADATA_ENTID': idmap,
    'WAHLUMFRAGEN_DATENBANK_TEST_LIVE': 'FALSE',
    'WAHLUMFRAGEN_DATENBANK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WAHLUMFRAGEN_DATENBANK_TEST_METADATA_ENTID']

  const live = 'TRUE' === env.WAHLUMFRAGEN_DATENBANK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WAHLUMFRAGEN_DATENBANK_TEST_METADATA_ENTID']
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
  
