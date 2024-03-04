package register

import (
	"encoding/json"
	"errors"
	"net/http"

	emailverifier "github.com/AfterShip/email-verifier"
	"github.com/farm-er/pyhon-go/database/datauser"
	"github.com/farm-er/pyhon-go/tools"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Register(w http.ResponseWriter, r *http.Request) (string, error) {

	// get email and password and name
	var newUser RegisterData
	err := json.NewDecoder(r.Body).Decode(&newUser)

	if err != nil {
		return "Error decoding data", err
	}
	// check if the data exists
	if len(newUser.Name) == 0 || len(newUser.Password) == 0 {
		return "Invalid data", errors.New("invalid data")
	}

	// check email

	valide := emailverifier.IsAddressValid(newUser.Email)

	if !valide {
		return "Invalid data", errors.New("invalid data")
	}

	// create hash from email md5
	id := tools.HashMd5(newUser.Email)
	// check if the user exists

	var user datauser.User
	user.Uid = id

	err = user.GetUserById()

	if err == nil {
		return "user already exist", errors.New("user already exists")
	}
	// hash password
	password, err := tools.HashPassword(newUser.Password)

	if err != nil {
		return "Error hashing password", err
	}
	// add user to the database

	user.Name = newUser.Name
	user.Password = password
	user.Email = newUser.Email
	user.Id = primitive.NewObjectID()
	user.Stores = []datauser.Stores{}

	err = user.AddUser()

	if err != nil {
		return "Error adding the user", err
	}

	// create token
	token, err := tools.GenerateJWToken(tools.TokenData{
		Uid:   id,
		Email: newUser.Email,
	})

	if err != nil {
		return "error generating token", err
	}

	// return token
	tools.WriteJSON(w, http.StatusOK, tools.JwtToken{
		Type:  "jwt",
		Token: token,
	})

	return "", nil
}
