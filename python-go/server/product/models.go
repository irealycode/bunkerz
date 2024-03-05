package product

import (
	"github.com/farm-er/pyhon-go/database/dataproduct"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GetProductData struct {
	StoreId   primitive.ObjectID `json:"store_id"`
	ProductId primitive.ObjectID `json:"product_id"`
}

type AddProductData struct {
	StoreId primitive.ObjectID  `json:"store_id"`
	Product dataproduct.Product `json:"product"`
}

type UpdateProductData struct {
	StoreId primitive.ObjectID  `json:"store_id" bson:"store_id"`
	Product dataproduct.Product `json:"product" bson:"product"`
}
