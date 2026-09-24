
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WahlumfragenDatenbankSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WahlumfragenDatenbankSDK.test()
    equal(testsdk instanceof WahlumfragenDatenbankSDK, true,
      'WahlumfragenDatenbankSDK.test() must return a client synchronously')
  })

})
