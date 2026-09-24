"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WahlumfragenDatenbankError = void 0;
class WahlumfragenDatenbankError extends Error {
    isWahlumfragenDatenbankError = true;
    sdk = 'WahlumfragenDatenbank';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.WahlumfragenDatenbankError = WahlumfragenDatenbankError;
//# sourceMappingURL=WahlumfragenDatenbankError.js.map