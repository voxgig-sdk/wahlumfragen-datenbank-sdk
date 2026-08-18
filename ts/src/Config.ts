
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


  main = {
    name: 'WahlumfragenDatenbank',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "Institute_ID",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "Method_ID",
          "type": "`$STRING`"
        },
        {
          "name": "Parliament_ID",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "Results",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "Survey_Period",
          "type": "`$OBJECT`"
        },
        {
          "name": "Surveyed_Persons",
          "type": "`$INTEGER`"
        },
        {
          "name": "Tasker_ID",
          "req": true,
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

