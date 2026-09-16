# WahlumfragenDatenbank SDK feature factory

from wahlumfragendatenbank_sdk.feature.base_feature import WahlumfragenDatenbankBaseFeature
from wahlumfragendatenbank_sdk.feature.ratelimit_feature import WahlumfragenDatenbankRatelimitFeature
from wahlumfragendatenbank_sdk.feature.retry_feature import WahlumfragenDatenbankRetryFeature
from wahlumfragendatenbank_sdk.feature.test_feature import WahlumfragenDatenbankTestFeature
from wahlumfragendatenbank_sdk.feature.timeout_feature import WahlumfragenDatenbankTimeoutFeature


_FEATURES = {
    "base": lambda: WahlumfragenDatenbankBaseFeature(),
    "ratelimit": lambda: WahlumfragenDatenbankRatelimitFeature(),
    "retry": lambda: WahlumfragenDatenbankRetryFeature(),
    "test": lambda: WahlumfragenDatenbankTestFeature(),
    "timeout": lambda: WahlumfragenDatenbankTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
