package voxgigwahlumfragendatenbanksdk

import (
	"github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/core"
	"github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/entity"
	"github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/feature"
	_ "github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go/utility"
)

// Type aliases preserve external API.
type WahlumfragenDatenbankSDK = core.WahlumfragenDatenbankSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WahlumfragenDatenbankEntity = core.WahlumfragenDatenbankEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WahlumfragenDatenbankError = core.WahlumfragenDatenbankError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetPollingDatabaseEntityFunc = func(client *core.WahlumfragenDatenbankSDK, entopts map[string]any) core.WahlumfragenDatenbankEntity {
		return entity.NewGetPollingDatabaseEntity(client, entopts)
	}
	core.NewMetadataEntityFunc = func(client *core.WahlumfragenDatenbankSDK, entopts map[string]any) core.WahlumfragenDatenbankEntity {
		return entity.NewMetadataEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWahlumfragenDatenbankSDK = core.NewWahlumfragenDatenbankSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWahlumfragenDatenbankSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WahlumfragenDatenbankSDK  { return NewWahlumfragenDatenbankSDK(nil) }
func Test() *WahlumfragenDatenbankSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
