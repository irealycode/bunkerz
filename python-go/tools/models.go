package tools

type TokenData struct {
	Uid   string `json:"uid"`
	Email string `json:"email"`
}

type JwtToken struct {
	Type  string `json:"type"`
	Token string `json:"token"`
}

type ServerError struct {
	Error          string `json:"error"`
	AdditionalData string `json:"additional_data"`
}
