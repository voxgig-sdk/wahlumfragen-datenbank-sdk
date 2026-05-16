# WahlumfragenDatenbank SDK exists test

require "minitest/autorun"
require_relative "../WahlumfragenDatenbank_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WahlumfragenDatenbankSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
