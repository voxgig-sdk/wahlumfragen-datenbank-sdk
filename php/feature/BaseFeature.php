<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK base feature

class WahlumfragenDatenbankBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WahlumfragenDatenbankContext $ctx, array $options): void {}
    public function PostConstruct(WahlumfragenDatenbankContext $ctx): void {}
    public function PostConstructEntity(WahlumfragenDatenbankContext $ctx): void {}
    public function SetData(WahlumfragenDatenbankContext $ctx): void {}
    public function GetData(WahlumfragenDatenbankContext $ctx): void {}
    public function GetMatch(WahlumfragenDatenbankContext $ctx): void {}
    public function SetMatch(WahlumfragenDatenbankContext $ctx): void {}
    public function PrePoint(WahlumfragenDatenbankContext $ctx): void {}
    public function PreSpec(WahlumfragenDatenbankContext $ctx): void {}
    public function PreRequest(WahlumfragenDatenbankContext $ctx): void {}
    public function PreResponse(WahlumfragenDatenbankContext $ctx): void {}
    public function PreResult(WahlumfragenDatenbankContext $ctx): void {}
    public function PreDone(WahlumfragenDatenbankContext $ctx): void {}
    public function PreUnexpected(WahlumfragenDatenbankContext $ctx): void {}
}
