package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetPollingDatabaseEntityFunc func(client *WahlumfragenDatenbankSDK, entopts map[string]any) WahlumfragenDatenbankEntity

var NewMetadataEntityFunc func(client *WahlumfragenDatenbankSDK, entopts map[string]any) WahlumfragenDatenbankEntity

