package user

import (
	"encoding/json"
	"net/http"

	"github.com/farm-er/pyhon-go/database/datauser"
	"github.com/farm-er/pyhon-go/tools"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUser(w http.ResponseWriter, r *http.Request) (string, error) {

	id, err := tools.VerifyToken(r.Header)

	if err != nil {
		return "Invalid token", err
	}

	var user datauser.User

	user.Id, err = primitive.ObjectIDFromHex(id)

	if err != nil {
		return "Couldn't get id", err
	}

	err = user.GetUserById()

	if err != nil {
		return "Error finding user", err
	}

	responseUser := GetUserResponse{
		Id:     user.Id,
		Name:   user.Name,
		Stores: user.Stores,
	}

	err = tools.WriteJSON(w, http.StatusOK, responseUser)

	if err != nil {
		return "Error writing response", err
	}

	return "", nil
}

func UpdateUser(w http.ResponseWriter, r *http.Request) (string, error) {

	var data UpdateUserData

	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		return "Error decoding data", err
	}

	id, err := tools.VerifyToken(r.Header)

	if err != nil {
		return "Invalid token", err
	}
	var user datauser.User

	user.Id, err = primitive.ObjectIDFromHex(id)

	if err != nil {
		return "Couldn't get id", err
	}

	err = user.UpdateUserById(data.Name)

	if err != nil {
		return "Error updating user name", err
	}

	err = tools.WriteJSON(w, http.StatusOK, tools.ServerError{
		Error: "User updated",
	})

	if err != nil {
		return "Error writing response", err
	}

	return "", nil
}

func DeleteUser(w http.ResponseWriter, r *http.Request) (string, error) {

	// need to understand interfaces
	var data DeleteUserData
	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		return "Error decoding data", err
	}

	id, err := tools.VerifyToken(r.Header)

	if err != nil {
		return "Invalid token", err
	}

	var user datauser.User

	user.Id, err = primitive.ObjectIDFromHex(id)

	if err != nil {
		return "Couldn't get id", err
	}

	err = user.GetUserById()

	if err != nil {
		return "Couldn't find user", err
	}

	err = tools.VerifyPassword(user.Password, data.Password)

	if err != nil {
		return "Incorrect password", err
	}

	err = user.DeleteUserById()

	if err != nil {
		return "Couldn't delete user", err
	}

	err = tools.WriteJSON(w, http.StatusOK, tools.ServerError{
		Error: "User deleted",
	})

	if err != nil {
		return "Error writing response", err
	}

	return "", nil
}
