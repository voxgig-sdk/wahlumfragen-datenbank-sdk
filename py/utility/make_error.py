# WahlumfragenDatenbank SDK utility: make_error

from __future__ import annotations
from core.operation import WahlumfragenDatenbankOperation
from core.result import WahlumfragenDatenbankResult
from core.control import WahlumfragenDatenbankControl
from core.error import WahlumfragenDatenbankError


def make_error_util(ctx, err):
    if ctx is None:
        from core.context import WahlumfragenDatenbankContext
        ctx = WahlumfragenDatenbankContext({}, None)

    op = ctx.op
    if op is None:
        op = WahlumfragenDatenbankOperation({})
    opname = op.name
    if opname == "" or opname == "_":
        opname = "unknown operation"

    result = ctx.result
    if result is None:
        result = WahlumfragenDatenbankResult({})
    result.ok = False

    if err is None:
        err = result.err
    if err is None:
        err = ctx.make_error("unknown", "unknown error")

    errmsg = ""
    if isinstance(err, WahlumfragenDatenbankError):
        errmsg = err.msg
    elif hasattr(err, "msg") and err.msg is not None:
        errmsg = err.msg
    elif isinstance(err, str):
        errmsg = err
    else:
        errmsg = str(err)

    msg = "WahlumfragenDatenbankSDK: " + opname + ": " + errmsg
    msg = ctx.utility.clean(ctx, msg)

    result.err = None

    spec = ctx.spec

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["err"] = {"message": msg}

    sdk_err = WahlumfragenDatenbankError("", msg, ctx)
    sdk_err.result = ctx.utility.clean(ctx, result)
    sdk_err.spec = ctx.utility.clean(ctx, spec)

    if isinstance(err, WahlumfragenDatenbankError):
        sdk_err.code = err.code

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err is False:
        return result.resdata, None

    return None, sdk_err
