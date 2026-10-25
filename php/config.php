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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Date',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Publication date in ISO 8601 format',
              'format' => 'date',
            ],
            [
              'name' => 'Institute_ID',
              'title' => 'Institute Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'ID of the polling institute',
            ],
            [
              'name' => 'Method_ID',
              'title' => 'Method Id',
              'type' => '`$STRING`',
              'short' => 'ID of the polling method',
            ],
            [
              'name' => 'Parliament_ID',
              'title' => 'Parliament Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'ID of the parliament',
            ],
            [
              'name' => 'Results',
              'title' => 'Results',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Polling results indexed by party ID',
            ],
            [
              'name' => 'Survey_Period',
              'title' => 'Survey Period',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'Surveyed_Persons',
              'title' => 'Surveyed Persons',
              'type' => '`$INTEGER`',
              'short' => 'Number of persons surveyed',
            ],
            [
              'name' => 'Tasker_ID',
              'title' => 'Tasker Id',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'ID of the poll commissioner',
            ],
          ],
          'name' => 'get_polling_database',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'segments' => [],
                  'parts' => [],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
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
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/last_update.txt',
                  'segments' => [
                    [
                      'lit' => 'last_update.txt',
                    ],
                  ],
                  'parts' => [
                    'last_update.txt',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'raw',
                    'media' => 'text/plain',
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
