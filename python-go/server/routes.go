package server

import (
	"net/http"

	"github.com/farm-er/pyhon-go/server/login"
	"github.com/farm-er/pyhon-go/server/media"
	"github.com/farm-er/pyhon-go/server/product"
	"github.com/farm-er/pyhon-go/server/register"
	"github.com/farm-er/pyhon-go/server/store"
	"github.com/farm-er/pyhon-go/server/user"
	"github.com/farm-er/pyhon-go/tools"
)

// post to login a user
func (s *ApiServer) handleLogin(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		body, err := login.Login(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	if r.Method == "OPTIONS" {
		w.Header().Set("Content-Type", "text/html")
		w.Header().Set("Allow", "OPTIONS, POST")
		w.Header().Set("Access-Control-Allow-Origin", "http://bunkerz.bon")
		w.Header().Set("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "86400")
		w.Header().Set("Vary", "Origin")
		w.Header().Set("Content-Length", "0")
		return
	}

	tools.WriteJSON(w, http.StatusBadRequest, tools.ServerError{
		Error:          "Invalid method ",
		AdditionalData: r.Method,
	})

}

// post to signup user
func (s *ApiServer) handleRegister(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		body, err := register.Register(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	tools.WriteJSON(w, http.StatusBadRequest, tools.ServerError{
		Error:          "Invalid method ",
		AdditionalData: r.Method,
	})

}

// GET to get user by just token
func (s *ApiServer) handleUser(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		body, err := user.GetUser(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	if r.Method == "PUT" {
		body, err := user.UpdateUser(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	if r.Method == "DELETE" {
		body, err := user.DeleteUser(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	tools.WriteJSON(w, http.StatusBadRequest, tools.ServerError{
		Error:          "Invalid method ",
		AdditionalData: r.Method,
	})

}

func (s *ApiServer) handleStore(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		body, err := store.GetStore(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}
	if r.Method == "POST" {
		body, err := store.AddStore(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}
	if r.Method == "PUT" {
		body, err := store.UpdateStoreInner(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}
	if r.Method == "DELETE" {
		body, err := store.DeleteStore(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	tools.WriteJSON(w, http.StatusBadRequest, tools.ServerError{
		Error:          "Invalid method ",
		AdditionalData: r.Method,
	})
}

func (s *ApiServer) handleProduct(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {
		body, err := product.AddProduct(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}
	if r.Method == "POST" {
		body, err := product.AddProduct(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}
	if r.Method == "PUT" {
		return
	}
	if r.Method == "DELETE" {
		return
	}

	tools.WriteJSON(w, http.StatusBadRequest, tools.ServerError{
		Error:          "Invalid method ",
		AdditionalData: r.Method,
	})

}

func (s *ApiServer) handleMedia(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		body, err := media.UploadFile(w, r)
		if err != nil {
			tools.ErrorWriter(w, err, body)
		}
		return
	}

	tools.WriteJSON(w, http.StatusBadRequest, tools.ServerError{
		Error:          "Invalid method ",
		AdditionalData: r.Method,
	})

}
