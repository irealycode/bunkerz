package product

import (
	"encoding/json"
	"net/http"
)

func GetProduct(w http.ResponseWriter, r *http.Request) (string, error) {
	// get a token and a store id and product id
	return "", nil
}

func AddProduct(w http.ResponseWriter, r *http.Request) (string, error) {

	var data AddProductData

	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		return "Error decoding data", err
	}

	return "", nil
}
