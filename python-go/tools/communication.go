package tools

import (
	"encoding/json"
	"net/http"
)

func WriteJSON(w http.ResponseWriter, status int, v any) error {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	err := json.NewEncoder(w).Encode(v)
	if err != nil {
		return err
	}
	w.WriteHeader(status)
	return nil
}

func ErrorWriter(w http.ResponseWriter, err error, body string) {
	WriteJSON(w, http.StatusBadRequest, ServerError{
		Error:          body,
		AdditionalData: err.Error(),
	})
}
