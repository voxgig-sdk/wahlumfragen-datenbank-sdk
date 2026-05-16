# WahlumfragenDatenbank SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WahlumfragenDatenbankFeatures
  def self.make_feature(name)
    case name
    when "base"
      WahlumfragenDatenbankBaseFeature.new
    when "test"
      WahlumfragenDatenbankTestFeature.new
    else
      WahlumfragenDatenbankBaseFeature.new
    end
  end
end
