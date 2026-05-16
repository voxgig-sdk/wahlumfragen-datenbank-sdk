-- WahlumfragenDatenbank SDK error

local WahlumfragenDatenbankError = {}
WahlumfragenDatenbankError.__index = WahlumfragenDatenbankError


function WahlumfragenDatenbankError.new(code, msg, ctx)
  local self = setmetatable({}, WahlumfragenDatenbankError)
  self.is_sdk_error = true
  self.sdk = "WahlumfragenDatenbank"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WahlumfragenDatenbankError:error()
  return self.msg
end


function WahlumfragenDatenbankError:__tostring()
  return self.msg
end


return WahlumfragenDatenbankError
