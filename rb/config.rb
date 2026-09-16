# WahlumfragenDatenbank SDK configuration

module WahlumfragenDatenbankConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "WahlumfragenDatenbank",
        "slug" => "wahlumfragen-datenbank",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.dawum.de",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_polling_database" => {},
          "metadata" => {},
        },
      },
      "entity" => {
        "get_polling_database" => {
          "fields" => [
            {
              "format" => "date",
              "name" => "Date",
              "req" => true,
              "short" => "Publication date in ISO 8601 format",
              "type" => "`$STRING`",
            },
            {
              "name" => "Institute_ID",
              "req" => true,
              "short" => "ID of the polling institute",
              "type" => "`$STRING`",
            },
            {
              "name" => "Method_ID",
              "short" => "ID of the polling method",
              "type" => "`$STRING`",
            },
            {
              "name" => "Parliament_ID",
              "req" => true,
              "short" => "ID of the parliament",
              "type" => "`$STRING`",
            },
            {
              "name" => "Results",
              "req" => true,
              "short" => "Polling results indexed by party ID",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "Survey_Period",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "Surveyed_Persons",
              "short" => "Number of persons surveyed",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "Tasker_ID",
              "req" => true,
              "short" => "ID of the poll commissioner",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_polling_database",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "segments" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "metadata" => {
          "fields" => [],
          "name" => "metadata",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/last_update.txt",
                  "segments" => [
                    {
                      "lit" => "last_update.txt",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "last_update.txt",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    WahlumfragenDatenbankFeatures.make_feature(name)
  end
end
