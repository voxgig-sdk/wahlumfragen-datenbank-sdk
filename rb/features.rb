# WahlumfragenDatenbank SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WahlumfragenDatenbankFeatures
  def self.make_feature(name)
    case name
    when "base"
      WahlumfragenDatenbankBaseFeature.new
    when "ratelimit"
      WahlumfragenDatenbankRatelimitFeature.new
    when "retry"
      WahlumfragenDatenbankRetryFeature.new
    when "test"
      WahlumfragenDatenbankTestFeature.new
    when "timeout"
      WahlumfragenDatenbankTimeoutFeature.new
    else
      WahlumfragenDatenbankBaseFeature.new
    end
  end
end
