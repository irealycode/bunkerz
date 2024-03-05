package datastore

import (
	"context"
	"fmt"

	"github.com/farm-er/pyhon-go/database"
	"go.mongodb.org/mongo-driver/bson"
)

func (s *Store) GetStoreById() error {

	filter := bson.M{"_id": s.Id}

	err := database.OpenCollection("stores").FindOne(context.Background(), filter).Decode(s)
	if err != nil {
		return err
	}

	return nil
}

func (s *Store) AddStore() error {

	result, err := database.OpenCollection("stores").InsertOne(context.TODO(), s)

	if err != nil {
		return err
	}

	fmt.Println(result)
	return nil
}

func (s *Store) UpdateInnerStore() error {

	update := bson.D{{Key: "$set", Value: bson.D{{Key: "inner", Value: s.Inner}}}}
	_, err := database.OpenCollection("stores").UpdateByID(context.TODO(), s.Id, update)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) AddProduct() error {

	s.NumberProducts += 1

	update := bson.D{{Key: "$set", Value: bson.D{{Key: "products", Value: s.Products}, {Key: "number_products", Value: s.NumberProducts}}}}
	_, err := database.OpenCollection("stores").UpdateByID(context.TODO(), s.Id, update)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) IncrementProductsNum() error {

	s.NumberProducts += 1

	update := bson.D{{Key: "$set", Value: bson.D{{Key: "number_products", Value: s.NumberProducts}}}}
	_, err := database.OpenCollection("stores").UpdateByID(context.TODO(), s.Id, update)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) AddProductId() error {

	update := bson.D{{Key: "$set", Value: bson.D{{Key: "products_ids", Value: s.ProductsIds}}}}

	_, err := database.OpenCollection("stores").UpdateByID(context.TODO(), s.Id, update)

	if err != nil {
		return err
	}

	return nil
}

func (s *Store) DeleteStoreById() error {

	filter := bson.M{"_id": s.Id}

	_, err := database.OpenCollection("stores").DeleteOne(context.TODO(), filter)

	if err != nil {
		return err
	}

	return nil
}

func (s *Store) UpdateProduct() error {

	update := bson.D{{Key: "$set", Value: bson.D{{Key: "products", Value: s.Products}}}}

	_, err := database.OpenCollection("stores").UpdateByID(context.TODO(), s.Id, update)

	if err != nil {
		return err
	}

	return nil
}
