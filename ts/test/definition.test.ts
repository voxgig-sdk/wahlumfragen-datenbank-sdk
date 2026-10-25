import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_polling_database",
    "accessor": "GetPollingDatabase",
    "op": "list",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Database": {},
      "License": {
        "Name": "ODC Open Database License",
        "Shortcut": "ODC-ODbL",
        "Link": "https://opendatacommons.org/licenses/odbl/"
      },
      "Publisher": "dawum.de",
      "Author": "DAWUM",
      "Last_Update": "2026-01-01T00:00:00Z",
      "Parliaments": {},
      "Institutes": {},
      "Taskers": {},
      "Methods": {},
      "Parties": {},
      "Surveys": [
        {
          "Parliament_ID": "x",
          "Institute_ID": "x",
          "Tasker_ID": "x",
          "Method_ID": "x",
          "Results": {},
          "Date": "2023-10-15",
          "Survey_Period": {
            "Date_Start": "2026-01-01",
            "Date_End": "2026-01-01"
          },
          "Surveyed_Persons": 1500
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "metadata",
    "accessor": "Metadata",
    "op": "load",
    "method": "GET",
    "path": "/last_update.txt",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "text/plain"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
