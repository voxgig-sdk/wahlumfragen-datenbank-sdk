<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

WahlumfragenDatenbankUtility::setRegistrar(function (WahlumfragenDatenbankUtility $u): void {
    $u->clean = [WahlumfragenDatenbankClean::class, 'call'];
    $u->done = [WahlumfragenDatenbankDone::class, 'call'];
    $u->make_error = [WahlumfragenDatenbankMakeError::class, 'call'];
    $u->feature_add = [WahlumfragenDatenbankFeatureAdd::class, 'call'];
    $u->feature_hook = [WahlumfragenDatenbankFeatureHook::class, 'call'];
    $u->feature_init = [WahlumfragenDatenbankFeatureInit::class, 'call'];
    $u->fetcher = [WahlumfragenDatenbankFetcher::class, 'call'];
    $u->make_fetch_def = [WahlumfragenDatenbankMakeFetchDef::class, 'call'];
    $u->make_context = [WahlumfragenDatenbankMakeContext::class, 'call'];
    $u->make_options = [WahlumfragenDatenbankMakeOptions::class, 'call'];
    $u->make_request = [WahlumfragenDatenbankMakeRequest::class, 'call'];
    $u->make_response = [WahlumfragenDatenbankMakeResponse::class, 'call'];
    $u->make_result = [WahlumfragenDatenbankMakeResult::class, 'call'];
    $u->make_point = [WahlumfragenDatenbankMakePoint::class, 'call'];
    $u->make_spec = [WahlumfragenDatenbankMakeSpec::class, 'call'];
    $u->make_url = [WahlumfragenDatenbankMakeUrl::class, 'call'];
    $u->param = [WahlumfragenDatenbankParam::class, 'call'];
    $u->prepare_auth = [WahlumfragenDatenbankPrepareAuth::class, 'call'];
    $u->prepare_body = [WahlumfragenDatenbankPrepareBody::class, 'call'];
    $u->prepare_headers = [WahlumfragenDatenbankPrepareHeaders::class, 'call'];
    $u->prepare_method = [WahlumfragenDatenbankPrepareMethod::class, 'call'];
    $u->prepare_params = [WahlumfragenDatenbankPrepareParams::class, 'call'];
    $u->prepare_path = [WahlumfragenDatenbankPreparePath::class, 'call'];
    $u->prepare_query = [WahlumfragenDatenbankPrepareQuery::class, 'call'];
    $u->result_basic = [WahlumfragenDatenbankResultBasic::class, 'call'];
    $u->result_body = [WahlumfragenDatenbankResultBody::class, 'call'];
    $u->result_headers = [WahlumfragenDatenbankResultHeaders::class, 'call'];
    $u->transform_request = [WahlumfragenDatenbankTransformRequest::class, 'call'];
    $u->transform_response = [WahlumfragenDatenbankTransformResponse::class, 'call'];
});
