# WahlumfragenDatenbank SDK

Access DAWUM's open database of German federal, state, and European election polls in JSON

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Wahlumfragen Datenbank API

[DAWUM](https://dawum.de) (Datenbank für Wahlumfragen) is a German project run by Philipp Guttmann that aggregates publicly published opinion polls for elections in Germany and Europe. The API exposes the same underlying dataset that powers the dawum.de website, served as JSON over HTTPS.

What you get from the API:

- A full polling database covering the Bundestag, 16 state parliaments (Landtage), and the European Parliament
- Surveys from established institutes such as Infratest dimap, Forsa, INSA, YouGov, and Allensbach
- Per-survey metadata: date, survey period, sample size, parliament, institute, commissioning media organisation ("Tasker"), and methodology (telephone, online, in-person, mixed)
- Result percentages broken down by political party (CDU/CSU, SPD, Grüne, FDP, AfD, Linke, BSW, Freie Wähler, and others)
- A separate feed of the most recent surveys for lightweight polling consumers

Operational notes: the endpoints are public and require no authentication, CORS is enabled, and responses are plain JSON. Data is refreshed as new polls are published.

## Try it

**TypeScript**
```bash
npm install wahlumfragen-datenbank
```

**Python**
```bash
pip install wahlumfragen-datenbank-sdk
```

**PHP**
```bash
composer require voxgig/wahlumfragen-datenbank-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go
```

**Ruby**
```bash
gem install wahlumfragen-datenbank-sdk
```

**Lua**
```bash
luarocks install wahlumfragen-datenbank-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { WahlumfragenDatenbankSDK } from 'wahlumfragen-datenbank'

const client = new WahlumfragenDatenbankSDK({})

// List all getpollingdatabases
const getpollingdatabases = await client.GetPollingDatabase().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o wahlumfragen-datenbank-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "wahlumfragen-datenbank": {
      "command": "/abs/path/to/wahlumfragen-datenbank-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GetPollingDatabase** | Returns the full DAWUM polling database as a single JSON document, including parliaments, parties, institutes, taskers, methods, and surveys (`GET /`). | `/` |
| **Metadata** | Returns a lighter feed of the newest surveys, suitable for clients that only need the most recent polling figures (`GET /newest_surveys.json`). | `/last_update.txt` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from wahlumfragendatenbank_sdk import WahlumfragenDatenbankSDK

client = WahlumfragenDatenbankSDK({})

# List all getpollingdatabases
getpollingdatabases, err = client.GetPollingDatabase(None).list(None, None)
```

### PHP

```php
<?php
require_once 'wahlumfragendatenbank_sdk.php';

$client = new WahlumfragenDatenbankSDK([]);

// List all getpollingdatabases
[$getpollingdatabases, $err] = $client->GetPollingDatabase(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/wahlumfragen-datenbank-sdk/go"

client := sdk.NewWahlumfragenDatenbankSDK(map[string]any{})

// List all getpollingdatabases
getpollingdatabases, err := client.GetPollingDatabase(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "WahlumfragenDatenbank_sdk"

client = WahlumfragenDatenbankSDK.new({})

# List all getpollingdatabases
getpollingdatabases, err = client.GetPollingDatabase(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("wahlumfragen-datenbank_sdk")

local client = sdk.new({})

-- List all getpollingdatabases
local getpollingdatabases, err = client:GetPollingDatabase(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = WahlumfragenDatenbankSDK.test()
const result = await client.GetPollingDatabase().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = WahlumfragenDatenbankSDK.test(None, None)
result, err = client.GetPollingDatabase(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = WahlumfragenDatenbankSDK::test(null, null);
[$result, $err] = $client->GetPollingDatabase(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetPollingDatabase(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = WahlumfragenDatenbankSDK.test(nil, nil)
result, err = client.GetPollingDatabase(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetPollingDatabase(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Wahlumfragen Datenbank API

- Upstream: [https://dawum.de](https://dawum.de)
- API docs: [https://api.dawum.de](https://api.dawum.de)

- Licensed under the [ODC Open Database License (ODC-ODbL 1.0)](https://opendatacommons.org/licenses/odbl/1-0/)
- Publisher: dawum.de (Dipl.-Jur. Philipp Guttmann)
- Attribution and share-alike are required for derivative databases
- Individual poll figures remain the property of the respective polling institutes

---

Generated from the Wahlumfragen Datenbank API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
