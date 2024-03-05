package store

import (
	"github.com/farm-er/pyhon-go/database/datastore"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GetStoreData struct {
	StoreId primitive.ObjectID `json:"store_id"`
}

type AddstoreData struct {
	Name      string `json:"name"`
	Subdomain string `json:"subdomain"`
	Private   bool   `json:"private"`
}

type UpdateInnerStoreData struct {
	StoreId primitive.ObjectID `json:"store_id"`
	Inner   datastore.Inner    `json:"inner"`
}

type DeleteStoreData struct {
	StoreId  primitive.ObjectID `json:"store_id"`
	Password string             `json:"password"`
}
