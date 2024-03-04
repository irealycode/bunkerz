package product

import (
	"github.com/farm-er/pyhon-go/database/datastore"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GetProductData struct {
	Token     string             `json:"token"`
	StoreId   primitive.ObjectID `json:"store_id"`
	ProductId primitive.ObjectID `json:"product_id"`
}

type AddProductData struct {
	Token   string             `json:"token"`
	StoreId primitive.ObjectID `json:"store_id"`
	Product datastore.Product  `json:"product"`
}
