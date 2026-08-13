<?php
declare(strict_types=1);

// WahlumfragenDatenbank SDK configuration

class WahlumfragenDatenbankConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WahlumfragenDatenbank",
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
              'active' => true,
              'name' => 'Date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'Institute_ID',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'Method_ID',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'Parliament_ID',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'Results',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'Survey_Period',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'Surveyed_Persons',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'Tasker_ID',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
          ],
          'name' => 'get_polling_database',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
                  'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
