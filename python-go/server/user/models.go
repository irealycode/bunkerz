package user

import (
	"github.com/farm-er/pyhon-go/database/datauser"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GetUserResponse struct {
	Id     primitive.ObjectID `json:"_id" bson:"_id"`
	Name   string             `json:"name" bson:"name"`
	Stores []datauser.Stores  `json:"stores" bson:"stores"`
}

type UpdateUserData struct {
	Name string `json:"name"`
}

type DeleteUserData struct {
	Password string `json:"password"`
}
