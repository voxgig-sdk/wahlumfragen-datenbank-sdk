# WahlumfragenDatenbank SDK utility: make_context
require_relative '../core/context'
module WahlumfragenDatenbankUtilities
  MakeContext = ->(ctxmap, basectx) {
    WahlumfragenDatenbankContext.new(ctxmap, basectx)
  }
end
