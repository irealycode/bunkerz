package datafiles

import (
	"context"

	"github.com/farm-er/pyhon-go/database"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (f *File) AddFile() error {

	f.Id = primitive.NewObjectID()

	_, err := database.OpenCollection("files").InsertOne(context.Background(), f)

	if err != nil {
		return err
	}

	return nil
}
