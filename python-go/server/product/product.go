package product

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

func GetProduct(w http.ResponseWriter, r *http.Request) (string, error) {

	var data GetProductData

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
		return "Error getting id", err
	}

	err = user.GetUserById()

	if err != nil {
		return "Couldn't find user", err
	}

	var store datastore.Store

	store.Id = data.StoreId

	err = store.GetStoreById()

	if err != nil {
		return "Couldn't find store", err
	}

	for _, product := range store.Products {
		if product.Id == data.ProductId {
			tools.WriteJSON(w, http.StatusOK, product)
			return "", nil
		}
	}

	if store.NumberProducts <= 10 {
		return "Couldn't find store", errors.New("couldn't find store")
	}

	var product dataproduct.Product

	product.Id = data.ProductId

	err = product.GetProductById()

	if err != nil {
		return "Couldn't find product", err
	}

	tools.WriteJSON(w, http.StatusOK, product)
	return "", nil
}

func AddProduct(w http.ResponseWriter, r *http.Request) (string, error) {

	var data AddProductData

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

	var store datastore.Store

	store.Id = data.StoreId

	err = store.GetStoreById()

	if err != nil {
		return "Couldn't find store", err
	}

	if store.NumberProducts < 10 {

		data.Product.Id = primitive.NewObjectID()

		store.Products = append(store.Products, data.Product)

		err = store.AddProduct()

		if err != nil {
			return "Couldn't add product", err
		}

	} else {

		product := dataproduct.Product{
			Id:            primitive.NewObjectID(),
			Description:   data.Product.Description,
			CostPrice:     data.Product.CostPrice,
			OriginalPrice: data.Product.OriginalPrice,
			Price:         data.Product.Price,
			FilesIds:      data.Product.FilesIds,
			Size:          data.Product.Size,
			Colors:        data.Product.Colors,
			Quantity:      data.Product.Quantity,
			Active:        data.Product.Active,
		}

		productId, err := product.AddProduct()

		if err != nil {
			return "Couldn't add store", err
		}

		store.ProductsIds = append(store.ProductsIds, productId)

		err = store.AddProductId()

		if err != nil {
			return "Couldn't update products ids", err
		}

		err = store.IncrementProductsNum()

		if err != nil {
			return "Error updating products number", err
		}
	}

	err = tools.WriteJSON(w, http.StatusOK, tools.ServerError{
		Error: "Product added successfully",
	})

	if err != nil {
		return "error writing response", err
	}

	return "", nil
}

func UpdateProduct(w http.ResponseWriter, r *http.Request) (string, error) {

	var data UpdateProductData

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

	var store datastore.Store

	store.Id = data.StoreId

	err = store.GetStoreById()

	if err != nil {
		return "Couldn't find store", err
	}

	for index, product := range store.Products {
		if product.Id == data.Product.Id {

			store.Products[index] = data.Product

			err = store.UpdateProduct()

			if err != nil {
				return "Error updating product", err
			}

			tools.WriteJSON(w, http.StatusOK, tools.ServerError{
				Error: "Product updated",
			})

			return "", nil
		}
	}

	if store.NumberProducts <= 10 {
		return "Couldn't find product", errors.New("couldn't find product")
	}

	for _, productId := range store.ProductsIds {
		if productId == data.Product.Id {

			product := data.Product
			err = product.UpdateProductById()

			if err != nil {
				return "Couldn't update product", err
			}
		}
	}

	err = tools.WriteJSON(w, http.StatusOK, tools.ServerError{
		Error: "Product updated",
	})
	if err != nil {
		return "Couldn't write response", err
	}

	return "", nil
}

func DeleteProduct(w http.ResponseWriter, r *http.Request) (string, error) {
	// get a token and a store id and product id

	return "", nil
}
