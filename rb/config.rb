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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
                  "parts" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "parts" => [
                    "last_update.txt",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
