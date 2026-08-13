# WahlumfragenDatenbank SDK feature factory

from wahlumfragendatenbank_sdk.feature.base_feature import WahlumfragenDatenbankBaseFeature
from wahlumfragendatenbank_sdk.feature.test_feature import WahlumfragenDatenbankTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WahlumfragenDatenbankBaseFeature(),
        "test": lambda: WahlumfragenDatenbankTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
