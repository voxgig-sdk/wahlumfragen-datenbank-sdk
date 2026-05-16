
import { Context } from './Context'


class WahlumfragenDatenbankError extends Error {

  isWahlumfragenDatenbankError = true

  sdk = 'WahlumfragenDatenbank'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WahlumfragenDatenbankError
}

