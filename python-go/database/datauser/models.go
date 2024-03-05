package datauser

import "go.mongodb.org/mongo-driver/bson/primitive"

type Stores struct {
	Id        primitive.ObjectID `json:"_id" bson:"_id"`
	Subdomain string             `json:"subdomain" bson:"subdomain"`
	Name      string             `json:"name" bson:"name"`
	Private   bool               `json:"private" bson:"private"`
}

type User struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Uid      string             `json:"uid" bson:"uid"`
	Name     string             `json:"name" bson:"name"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
	Stores   []Stores           `json:"stores" bson:"stores"`
}
