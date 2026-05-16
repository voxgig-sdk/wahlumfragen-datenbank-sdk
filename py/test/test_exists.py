# ProjectName SDK exists test

import pytest
from wahlumfragendatenbank_sdk import WahlumfragenDatenbankSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WahlumfragenDatenbankSDK.test(None, None)
        assert testsdk is not None
