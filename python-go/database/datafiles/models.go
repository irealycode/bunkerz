package datafiles

import "go.mongodb.org/mongo-driver/bson/primitive"

type File struct {
	Id       primitive.ObjectID `json:"id" bson:"_id"`
	FileName string             `json:"file_name" bson:"file_name"`
}
