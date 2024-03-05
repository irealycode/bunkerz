package login

import (
	"encoding/json"
	"errors"
	"net/http"

	emailverifier "github.com/AfterShip/email-verifier"
	"github.com/farm-er/pyhon-go/database/datauser"
	"github.com/farm-er/pyhon-go/tools"
)

func Login(w http.ResponseWriter, r *http.Request) (string, error) {

	// get email and password
	var userCheck LoginData
	err := json.NewDecoder(r.Body).Decode(&userCheck)
	if err != nil {
		return "error decoding data", err
	}
	// check if the data exists
	if len(userCheck.Password) == 0 || len(userCheck.Email) == 0 {
		return "Invalid data", errors.New("invalid data")
	}

	valid := emailverifier.IsAddressValid(userCheck.Email)

	if !valid {
		return "Invalid data", errors.New("invalid data")
	}

	// check if exist
	var user datauser.User
	user.Email = userCheck.Email

	err = user.GetUserByEmail()

	if err != nil {
		return "No user matching the info", err
	}

	err = tools.VerifyPassword(user.Password, userCheck.Password)

	if err != nil {
		return "No user matching the info", err
	}

	// create token if exists
	token, err := tools.GenerateJWToken(tools.TokenData{
		Id:    user.Id.Hex(),
		Email: user.Email,
	})
	if err != nil {
		return "error generating token", err
	}

	tools.WriteJSON(w, http.StatusOK, tools.JwtToken{
		Type:  "jwt",
		Token: token,
	})
	return "", nil
}
