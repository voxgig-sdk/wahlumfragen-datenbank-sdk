
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'WahlumfragenDatenbank',
        slug: "wahlumfragen-datenbank",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.dawum.de",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_polling_database: {
      },

      metadata: {
      },

    }
  }


  entity = {
    "get_polling_database": {
      "fields": [
        {
          "name": "Date",
          "req": true,
          "short": "Publication date in ISO 8601 format",
          "type": "`$STRING`"
        },
        {
          "name": "Institute_ID",
          "req": true,
          "short": "ID of the polling institute",
          "type": "`$STRING`"
        },
        {
          "name": "Method_ID",
          "short": "ID of the polling method",
          "type": "`$STRING`"
        },
        {
          "name": "Parliament_ID",
          "req": true,
          "short": "ID of the parliament",
          "type": "`$STRING`"
        },
        {
          "name": "Results",
          "req": true,
          "short": "Polling results indexed by party ID",
          "type": "`$OBJECT`"
        },
        {
          "name": "Survey_Period",
          "type": "`$OBJECT`"
        },
        {
          "name": "Surveyed_Persons",
          "short": "Number of persons surveyed",
          "type": "`$INTEGER`"
        },
        {
          "name": "Tasker_ID",
          "req": true,
          "short": "ID of the poll commissioner",
          "type": "`$STRING`"
        }
      ],
      "name": "get_polling_database",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "metadata": {
      "fields": [],
      "name": "metadata",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/last_update.txt",
              "parts": [
                "last_update.txt"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

