package datauser

import (
	"context"
	"errors"
	"fmt"

	"github.com/farm-er/pyhon-go/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// func GetUserById(id string) (User, error)

func (u *User) GetUserById() error {
	filter := bson.M{"uid": u.Uid}
	err := database.OpenCollection("user").FindOne(context.Background(), filter).Decode(u)
	if err != nil {
		return err
	}
	return nil
}

func (u *User) AddUser() error {
	result, err := database.OpenCollection("user").InsertOne(context.Background(), u)
	fmt.Println(result)
	return err
}

func (u *User) GetUserByEmail() error {
	filter := bson.M{"email": u.Email}
	err := database.OpenCollection("user").FindOne(context.Background(), filter).Decode(&u)
	return err
}

func (u *User) DeleteUserById() error {

	filter := bson.M{"uid": u.Uid}

	_, err := database.OpenCollection("user").DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return nil
}

func (u *User) UpdateUserById(newName string) error {

	filter := bson.M{"uid": u.Uid}
	update := bson.D{{"$set", bson.D{{"name", newName}}}}

	_, err := database.OpenCollection("user").UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return err
	}

	return nil
}

func (u *User) UpdateUserStores() error {
	filter := bson.M{"email": u.Email}
	update := bson.D{{"$set", bson.D{{"stores", u.Stores}}}}
	_, err := database.OpenCollection("user").UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func (u *User) CheckExistentStore(id primitive.ObjectID) (primitive.ObjectID, error) {

	for _, store := range u.Stores {
		if store.Id == id {
			return store.Id, nil
		}
	}
	return primitive.NilObjectID, errors.New("store with this information doesn't exist")
}

func (u *User) DeleteStoreById(id primitive.ObjectID) error {

	var newStores []Stores

	for _, store := range u.Stores {
		if store.Id != id {
			newStores = append(newStores, store)
		}
	}
	u.Stores = newStores

	err := u.UpdateUserStores()

	if err != nil {
		return err
	}

	return nil
}
