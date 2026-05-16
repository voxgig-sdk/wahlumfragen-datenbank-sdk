# WahlumfragenDatenbank SDK utility: feature_add
module WahlumfragenDatenbankUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
