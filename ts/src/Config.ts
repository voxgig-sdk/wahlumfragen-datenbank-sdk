
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Date",
          "type": "`$STRING`",
          "req": true,
          "short": "Publication date in ISO 8601 format",
          "format": "date"
        },
        {
          "name": "Institute_ID",
          "title": "Institute Id",
          "type": "`$STRING`",
          "req": true,
          "short": "ID of the polling institute"
        },
        {
          "name": "Method_ID",
          "title": "Method Id",
          "type": "`$STRING`",
          "short": "ID of the polling method"
        },
        {
          "name": "Parliament_ID",
          "title": "Parliament Id",
          "type": "`$STRING`",
          "req": true,
          "short": "ID of the parliament"
        },
        {
          "name": "Results",
          "title": "Results",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Polling results indexed by party ID"
        },
        {
          "name": "Survey_Period",
          "title": "Survey Period",
          "type": "`$OBJECT`"
        },
        {
          "name": "Surveyed_Persons",
          "title": "Surveyed Persons",
          "type": "`$INTEGER`",
          "short": "Number of persons surveyed"
        },
        {
          "name": "Tasker_ID",
          "title": "Tasker Id",
          "type": "`$STRING`",
          "req": true,
          "short": "ID of the poll commissioner"
        }
      ],
      "name": "get_polling_database",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "segments": [],
              "parts": [],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
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
              "kind": "http",
              "method": "GET",
              "orig": "/last_update.txt",
              "segments": [
                {
                  "lit": "last_update.txt"
                }
              ],
              "parts": [
                "last_update.txt"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "raw",
                "media": "text/plain"
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
  config,
  FEATURE_PLUGINS,
}

