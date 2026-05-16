-- ProjectName SDK exists test

local sdk = require("wahlumfragen-datenbank_sdk")

describe("WahlumfragenDatenbankSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
