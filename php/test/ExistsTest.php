<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK exists test

require_once __DIR__ . '/../wahlumfragendatenbank_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = WahlumfragenDatenbankSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
