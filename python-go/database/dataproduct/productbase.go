package dataproduct

import (
	"context"

	"github.com/farm-er/pyhon-go/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (p *Product) AddProduct() (primitive.ObjectID, error) {

	result, err := database.OpenCollection("products").InsertOne(context.Background(), p)

	if err != nil {
		return primitive.NilObjectID, err
	}

	return result.InsertedID.(primitive.ObjectID), nil
}

func (p *Product) GetProductById() error {

	filter := bson.M{"_id": p.Id}

	err := database.OpenCollection("products").FindOne(context.TODO(), filter).Decode(p)

	if err != nil {
		return err
	}

	return nil
}

func (p *Product) UpdateProductById() error {

	filter := bson.M{"_id": p.Id}

	_, err := database.OpenCollection("products").ReplaceOne(context.TODO(), filter, p)
	if err != nil {
		return err
	}

	return nil
}
