package core

type WahlumfragenDatenbankError struct {
	IsWahlumfragenDatenbankError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWahlumfragenDatenbankError(code string, msg string, ctx *Context) *WahlumfragenDatenbankError {
	return &WahlumfragenDatenbankError{
		IsWahlumfragenDatenbankError: true,
		Sdk:              "WahlumfragenDatenbank",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WahlumfragenDatenbankError) Error() string {
	return e.Msg
}
