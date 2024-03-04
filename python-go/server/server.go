package server

import (
	"fmt"
	"net/http"

	"github.com/farm-er/pyhon-go/tools"
)

type ApiServer struct {
	addr string
}

func CreateServer(addr string) *ApiServer {
	return &ApiServer{
		addr: addr,
	}
}

func (s *ApiServer) Run() {

	// trier files

	// /register: create id from email to md5 add him to database
	// login normal return jwt token

	//

	http.HandleFunc("/login", s.handleLogin)
	http.HandleFunc("/register", s.handleRegister)
	http.HandleFunc("/user", s.handleUser)
	http.HandleFunc("/store", s.handleStore)
	http.HandleFunc("/product", s.handleProduct)
	http.HandleFunc("/media", s.handleMedia)
	http.HandleFunc("/try", s.handletry)

	fmt.Println("Server running on port", s.addr)
	http.ListenAndServe(s.addr, nil)
}

func (s *ApiServer) handletry(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("token")

	tools.WriteJSON(w, http.StatusOK, token)

}
