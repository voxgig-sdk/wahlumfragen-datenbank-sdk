# WahlumfragenDatenbank SDK utility: make_context

from core.context import WahlumfragenDatenbankContext


def make_context_util(ctxmap, basectx):
    return WahlumfragenDatenbankContext(ctxmap, basectx)
