# WahlumfragenDatenbank SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "WahlumfragenDatenbank",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.dawum.de",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_polling_database": {},
                "metadata": {},
            },
        },
        "entity": {
      "get_polling_database": {
        "fields": [
          {
            "name": "Date",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "Institute_ID",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "Method_ID",
            "type": "`$STRING`",
          },
          {
            "name": "Parliament_ID",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "Results",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "Survey_Period",
            "type": "`$OBJECT`",
          },
          {
            "name": "Surveyed_Persons",
            "type": "`$INTEGER`",
          },
          {
            "name": "Tasker_ID",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "get_polling_database",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "metadata": {
        "fields": [],
        "name": "metadata",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/last_update.txt",
                "parts": [
                  "last_update.txt",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
