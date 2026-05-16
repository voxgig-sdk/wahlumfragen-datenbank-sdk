# WahlumfragenDatenbank SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WahlumfragenDatenbankUtility.registrar = ->(u) {
  u.clean = WahlumfragenDatenbankUtilities::Clean
  u.done = WahlumfragenDatenbankUtilities::Done
  u.make_error = WahlumfragenDatenbankUtilities::MakeError
  u.feature_add = WahlumfragenDatenbankUtilities::FeatureAdd
  u.feature_hook = WahlumfragenDatenbankUtilities::FeatureHook
  u.feature_init = WahlumfragenDatenbankUtilities::FeatureInit
  u.fetcher = WahlumfragenDatenbankUtilities::Fetcher
  u.make_fetch_def = WahlumfragenDatenbankUtilities::MakeFetchDef
  u.make_context = WahlumfragenDatenbankUtilities::MakeContext
  u.make_options = WahlumfragenDatenbankUtilities::MakeOptions
  u.make_request = WahlumfragenDatenbankUtilities::MakeRequest
  u.make_response = WahlumfragenDatenbankUtilities::MakeResponse
  u.make_result = WahlumfragenDatenbankUtilities::MakeResult
  u.make_point = WahlumfragenDatenbankUtilities::MakePoint
  u.make_spec = WahlumfragenDatenbankUtilities::MakeSpec
  u.make_url = WahlumfragenDatenbankUtilities::MakeUrl
  u.param = WahlumfragenDatenbankUtilities::Param
  u.prepare_auth = WahlumfragenDatenbankUtilities::PrepareAuth
  u.prepare_body = WahlumfragenDatenbankUtilities::PrepareBody
  u.prepare_headers = WahlumfragenDatenbankUtilities::PrepareHeaders
  u.prepare_method = WahlumfragenDatenbankUtilities::PrepareMethod
  u.prepare_params = WahlumfragenDatenbankUtilities::PrepareParams
  u.prepare_path = WahlumfragenDatenbankUtilities::PreparePath
  u.prepare_query = WahlumfragenDatenbankUtilities::PrepareQuery
  u.result_basic = WahlumfragenDatenbankUtilities::ResultBasic
  u.result_body = WahlumfragenDatenbankUtilities::ResultBody
  u.result_headers = WahlumfragenDatenbankUtilities::ResultHeaders
  u.transform_request = WahlumfragenDatenbankUtilities::TransformRequest
  u.transform_response = WahlumfragenDatenbankUtilities::TransformResponse
}
