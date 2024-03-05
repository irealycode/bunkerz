package store

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/farm-er/pyhon-go/database/dataproduct"
	"github.com/farm-er/pyhon-go/database/datastore"
	"github.com/farm-er/pyhon-go/database/datauser"
	"github.com/farm-er/pyhon-go/tools"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetStore(w http.ResponseWriter, r *http.Request) (string, error) {

	var data GetStoreData

	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		return "Error decoding data", err
	}

	id, err := tools.VerifyToken(r.Header)

	if err != nil {
		return "Error verifying token", err
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

	var store datastore.Store
	store.Id = data.StoreId

	err = store.GetStoreById()

	if err != nil {
		return "Couldn't find store", err
	}

	err = user.CheckExistentStore(store.Id)

	if err != nil {
		return "This user doen't have a store", err
	}

	err = tools.WriteJSON(w, http.StatusOK, store)

	if err != nil {
		return "error writing response", err
	}

	return "", nil

}

func AddStore(w http.ResponseWriter, r *http.Request) (string, error) {

	// request: token - store name - private or not
	// check token
	// check user

	var data AddstoreData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		return "Error decoding data", err
	}

	// need to check for the private field
	if data.Name == "" || data.Subdomain == "" {
		return "invalid data", errors.New("invalid data")
	}

	// verify token
	// returns the email of the user or error

	id, err := tools.VerifyToken(r.Header)

	if err != nil {
		return id, err
	}
	var user datauser.User
	user.Id, err = primitive.ObjectIDFromHex(id)

	if err != nil {
		return "Couldn't get id", err
	}

	err = user.GetUserById()
	if err != nil {
		return "couldn't get the user", err
	}

	//////////////////////////////////////////////////////////

	for _, store := range user.Stores {
		if store.Name == data.Name {
			return "Name already exists", errors.New("you already have a store with that name")
		}
		if store.Subdomain == data.Subdomain {
			return "subdomain already exists", errors.New("you already have a store with that subdomain")
		}
	}

	// create store
	store := datastore.Store{
		Id:          primitive.NewObjectID(),
		Name:        data.Name,
		Private:     data.Private,
		Subdomain:   data.Subdomain,
		Products:    []dataproduct.Product{},
		Inner:       datastore.Inner{},
		ProductsIds: []primitive.ObjectID{},
	}

	err = store.AddStore()
	if err != nil {
		return "error adding store", err
	}

	user.Stores = append(user.Stores, datauser.Stores{
		Id:        store.Id,
		Subdomain: store.Subdomain,
		Name:      store.Name,
		Private:   store.Private,
	})

	err = user.UpdateUserStores()
	if err != nil {
		return "couldn't update the user", err
	}

	err = tools.WriteJSON(w, http.StatusOK, tools.ServerError{
		Error:          "store added",
		AdditionalData: "",
	})

	if err != nil {
		return "error writing response", err
	}

	return "", nil
}

func UpdateStoreInner(w http.ResponseWriter, r *http.Request) (string, error) {

	var data UpdateInnerStoreData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		return "Error decoding data", err
	}

	id, err := tools.VerifyToken(r.Header)
	if err != nil {
		return id, err
	}
	var user datauser.User
	user.Id, err = primitive.ObjectIDFromHex(id)

	if err != nil {
		return "Couldn't get id", err
	}

	err = user.GetUserById()

	if err != nil {
		return "error finding user", err
	}
	var store datastore.Store
	store.Id = data.StoreId

	err = store.GetStoreById()

	if err != nil {
		return "Error finding store", err
	}

	store.Inner = data.Inner

	err = store.UpdateInnerStore()
	if err != nil {
		return "Error updating store", err
	}

	err = tools.WriteJSON(w, http.StatusBadGateway, tools.ServerError{
		Error: "store updated",
	})

	if err != nil {
		return "error writing response", err
	}

	return "", nil
}

func DeleteStore(w http.ResponseWriter, r *http.Request) (string, error) {

	var data DeleteStoreData

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
		return "Error checking password", err
	}

	err = user.CheckExistentStore(data.StoreId)

	if err != nil {
		return "Error finding the store", err
	}

	var store datastore.Store
	store.Id = data.StoreId

	err = store.DeleteStoreById()

	if err != nil {
		return "Error deleting store", err
	}

	err = user.DeleteStoreById(data.StoreId)

	if err != nil {
		return "Error deleting store", err
	}

	err = tools.WriteJSON(w, http.StatusBadGateway, tools.ServerError{
		Error: "store deleted",
	})

	if err != nil {
		return "error writing response", err
	}

	return "", nil

}
