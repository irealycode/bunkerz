package dataproduct

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	Id            primitive.ObjectID `json:"_id" bson:"_id"`
	Description   string             `json:"description" bson:"description"`
	CostPrice     string             `json:"cost_price" bson:"cost_price"`
	OriginalPrice string             `json:"original_price" bson:"original_price"`
	Price         int                `json:"price" bson:"price"`
	FilesIds      []string           `json:"files_ids" bson:"files_ids"`
	Size          []int              `json:"size" bson:"size"`
	Colors        []string           `json:"colors" bson:"colors"`
	Quantity      float32            `json:"quantity" bson:"quantity"`
	Active        bool               `json:"active" bson:"active"`
}
