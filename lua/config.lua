-- WahlumfragenDatenbank SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "WahlumfragenDatenbank",
      slug = "wahlumfragen-datenbank",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.dawum.de",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_polling_database"] = {},
        ["metadata"] = {},
      },
    },
    entity = {
      ["get_polling_database"] = {
        ["fields"] = {
          {
            ["name"] = "Date",
            ["req"] = true,
            ["short"] = "Publication date in ISO 8601 format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Institute_ID",
            ["req"] = true,
            ["short"] = "ID of the polling institute",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Method_ID",
            ["short"] = "ID of the polling method",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Parliament_ID",
            ["req"] = true,
            ["short"] = "ID of the parliament",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Results",
            ["req"] = true,
            ["short"] = "Polling results indexed by party ID",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "Survey_Period",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "Surveyed_Persons",
            ["short"] = "Number of persons surveyed",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "Tasker_ID",
            ["req"] = true,
            ["short"] = "ID of the poll commissioner",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_polling_database",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["metadata"] = {
        ["fields"] = {},
        ["name"] = "metadata",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/last_update.txt",
                ["parts"] = {
                  "last_update.txt",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
