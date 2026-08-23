<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK configuration

class WahlumfragenDatenbankConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WahlumfragenDatenbank",
                "slug" => "wahlumfragen-datenbank",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.dawum.de",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_polling_database" => [],
                    "metadata" => [],
                ],
            ],
            "entity" => [
        'get_polling_database' => [
          'fields' => [
            [
              'name' => 'Date',
              'req' => true,
              'short' => 'Publication date in ISO 8601 format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Institute_ID',
              'req' => true,
              'short' => 'ID of the polling institute',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Method_ID',
              'short' => 'ID of the polling method',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Parliament_ID',
              'req' => true,
              'short' => 'ID of the parliament',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Results',
              'req' => true,
              'short' => 'Polling results indexed by party ID',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'Survey_Period',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'Surveyed_Persons',
              'short' => 'Number of persons surveyed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Tasker_ID',
              'req' => true,
              'short' => 'ID of the poll commissioner',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_polling_database',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'metadata' => [
          'fields' => [],
          'name' => 'metadata',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/last_update.txt',
                  'parts' => [
                    'last_update.txt',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WahlumfragenDatenbankFeatures::make_feature($name);
    }
}
