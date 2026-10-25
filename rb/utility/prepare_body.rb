# WahlumfragenDatenbank SDK utility: prepare_body
require_relative 'media'
module WahlumfragenDatenbankUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WahlumfragenDatenbankUtilities.raw_body(ctx.reqdata) if WahlumfragenDatenbankUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
