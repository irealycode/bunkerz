package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"
	
	"golang.org/x/net/context"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client       *mongo.Client
	user_col     *mongo.Collection
	stores_col   *mongo.Collection
	private_key  = "MIICWwIBAAKBgH6F7rrAdGPbzOjIg0A2T8giaNQX9cA52OGvwojmPCbl7cq4UeBbL1AtdHK7xqACEyYu8ymQWydVoYv4RRUxtNLbOVbY7s8/v0tRo1itMZwFt6f0S2/Mr/odTWcpXsV8H5BVs55AGfxDHcd5EtY66V5bCZEBlETiOJ4lRLkidAgMBAAECYBqCjhWPtyNoPdxFjSiyaIO1CeieJHFHcNj65nggQ5jD4wnvimpE1sSlryMM0gbswF3nBvidwFeyy8VD6ReqfIUrb/dR9UaeCufH1sCBdGjDFozTIsW6AVfghW4l3lGdACCoMa2Mrizar0oIV73KsrzypE41dcm9gkpFRyje5QJBANiLNzJ57KiBZgXBJ5aC8l2LfBPugyO1ILe3wNhStGzBLx2pZkPq6IYQqeYNDr5GbTfVLs0kQhXEKXKR2ycCQQCVk6nW5PwHGWQ4TJR4qGiq6J0T5lAvE7KMau4jJ5E4J/Nkby57z6gNQGff9BIhx5XSiq4Y3Awjjwlhoq6ibAkAeOD95wd4vHe/YciGmNZwRRfgI6A5G2P3f6tK0O/xBXzHzO5CqDPPEeBEBKp8D2QKmKuxYVBAynWzDUmudAkAtTd5hlXrqIssajWGHiwrpDyUeWvL9oFbn9KcoPnLohr3M62Pird2iYldX0WmqZb9gefG/cpRgenZOjUFAkEAmLmLrd1FWA2u4wqlybIUMm07c8NBV5lqt9zwo8JGnY8cbLmFA92rDaZZ6YOmcRUhi2Q46ONQKxbXk7DuH78g"
	uploadFolder = "../public/uploads"
	allowedExts  = []string{"png", "jpg", "jpeg", "gif"}
)

func main() {
	rand.Seed(time.Now().UnixNano())

	// Connect to MongoDB
	clientOptions := options.Client().ApplyURI("mongodb://swaperz:8937@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=swaperz&appName=mongosh+1.5.0")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// Get collection references
	user_col = client.Database("swaperz").Collection("users")
	stores_col = client.Database("swaperz").Collection("stores")

	// Create Gin router
	router := gin.Default()
	router.Use(cors.Default())

	// Define routes
	router.POST("/register", register)
	router.POST("/login", login)
	router.POST("/addstore", addStore)
	router.POST("/savestore", saveStore)
	router.POST("/getstore", getStore)
	router.POST("/uid", getUID)
	router.POST("/upload", uploadFile)
	router.POST("/saveproduct", saveProduct)
	router.POST("/activeproduct", activeProduct)

	// Run the server
	router.Run(":4242")
}

func register(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	email := s["email"].(string)
	ehash := fmt.Sprintf("%x", md5.Sum([]byte(email)))
	uid := ehash

	var e bson.M
	err = user_col.FindOne(context.Background(), bson.M{"uid": uid}).Decode(&e)
	if err != nil {
		s["uid"] = ehash
		password := s["password"].(string)
		s["password"] = fmt.Sprintf("%x", md5.Sum([]byte(password)))
		_, err = user_col.InsertOne(context.Background(), s)
		if err != nil {
			c.String(http.StatusInternalServerError, "505")
			return
		}
	} else {
		c.String(http.StatusOK, "exists")
		return
	}

	c.String(http.StatusOK, "ok")
}

func login(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	email := s["email"].(string)
	ehash := fmt.Sprintf("%x", md5.Sum([]byte(email)))
	uid := ehash

	var e bson.M
	err = user_col.FindOne(context.Background(), bson.M{"uid": uid}).Decode(&e)
	if err != nil || e["password"].(string) != fmt.Sprintf("%x", md5.Sum([]byte(s["password"].(string)))) {
		c.String(http.StatusOK, "505")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"uid":   ehash,
	})
	tokenString, err := token.SignedString([]byte(private_key))
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	c.String(http.StatusOK, tokenString)
}

func addStore(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	jid, err := jwt.Parse(s["jid"].(string), func(token *jwt.Token) (interface{}, error) {
		return []byte(private_key), nil
	})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	claims, ok := jid.Claims.(jwt.MapClaims)
	if !ok || !jid.Valid {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	uid := claims["uid"].(string)

	var e bson.M
	err = user_col.FindOne(context.Background(), bson.M{"uid": uid}).Decode(&e)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	storeID := getID()
	prv := false
	if s["prv"].(string) == "prv" {
		prv = true
	}

	stores, ok := e["stores"].([]interface{})
	if !ok {
		stores = make([]interface{}, 0)
	}
	stores = append(stores, bson.M{
		"store_id": storeID,
		"name":     s["name"].(string),
		"p":        prv,
	})

	_, err = user_col.UpdateOne(context.Background(), bson.M{"uid": uid}, bson.M{"$set": bson.M{"stores": stores}})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	_, err = stores_col.InsertOne(context.Background(), bson.M{
		"owner":    uid,
		"store_id": storeID,
		"name":     s["name"].(string),
		"p":        prv,
	})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	c.String(http.StatusOK, "ok")
}

func saveStore(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	jid, err := jwt.Parse(s["jid"].(string), func(token *jwt.Token) (interface{}, error) {
		return []byte(private_key), nil
	})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	claims, ok := jid.Claims.(jwt.MapClaims)
	if !ok || !jid.Valid {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	uid := claims["uid"].(string)

	err := stores_col.FindOne(context.Background(), bson.M{"store_id": s["sid"].(string)}).Decode(&st)
	if err != nil || err["owner"].(string) != uid {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	_, err = stores_col.UpdateOne(context.Background(), bson.M{"store_id": s["sid"].(string)}, bson.M{"$set": bson.M{"inner": s["save"]}})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	c.String(http.StatusOK, "updated")
}

func getStore(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	var st bson.M
	if s["w"].(int) == 0 {
		err = stores_col.FindOne(context.Background(), bson.M{"subdomain": s["subd"].(string)}).Decode(&st)
	} else {
		err = stores_col.FindOne(context.Background(), bson.M{"store_id": s["sid"].(string)}).Decode(&st)
	}
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	_, ok1 := st["inner"].(bson.M)
	_, ok2 := st["products"].(bson.M)
	if !ok1 || !ok2 {
		c.String(http.StatusOK, "no.")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"store":    st["inner"],
		"products": st["products"],
	})
}

func getUID(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	jid, err := jwt.Parse(s["jid"].(string), func(token *jwt.Token) (interface{}, error) {
		return []byte(private_key), nil
	})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	claims, ok := jid.Claims.(jwt.MapClaims)
	if !ok || !jid.Valid {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	uid := claims["uid"].(string)

	var e bson.M
	err = user_col.FindOne(context.Background(), bson.M{"uid": uid}).Decode(&e)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"stores": e["stores"],
	})
}

func uploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file part"})
		return
	}

	ext := strings.ToLower(file.Filename[strings.LastIndex(file.Filename, ".")+1:])
	if !contains(allowedExts, ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file format"})
		return
	}

	filename := getID() + "." + ext
	err = c.SaveUploadedFile(file, uploadFolder+"/"+filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": filename})
}

func saveProduct(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	jid, err := jwt.Parse(s["jid"].(string), func(token *jwt.Token) (interface{}, error) {
		return []byte(private_key), nil
	})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	claims, ok := jid.Claims.(jwt.MapClaims)
	if !ok || !jid.Valid {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	uid := claims["uid"].(string)

	var e bson.M
	err = user_col.FindOne(context.Background(), bson.M{"uid": uid}).Decode(&e)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	if !checkStore(e["stores"].([]interface{}), s["sid"].(string)) {
		c.String(http.StatusInternalServerError, "506")
		return
	}

	st := stores_col.FindOne(context.Background(), bson.M{"store_id": s["sid"].(string)}).Decode(&st)
	if st != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	pr, ok := st["products"].([]interface{})
	if !ok {
		pr = make([]interface{}, 0)
	}
	s["save"].(map[string]interface{})["pid"] = getID()
	pr = append(pr, s["save"])

	_, err = stores_col.UpdateOne(context.Background(), bson.M{"store_id": s["sid"].(string)}, bson.M{"$set": bson.M{"products": pr}})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	c.String(http.StatusOK, "ok")
}

func activeProduct(c *gin.Context) {
	var s map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&s)
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	jid, err := jwt.Parse(s["jid"].(string), func(token *jwt.Token) (interface{}, error) {
		return []byte(private_key), nil
	})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	claims, ok := jid.Claims.(jwt.MapClaims)
	if !ok || !jid.Valid {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	uid := claims["uid"].(string)

	var st bson.M
	err = stores_col.FindOne(context.Background(), bson.M{"store_id": s["sid"].(string)}).Decode(&st)
	if err != nil || st["owner"].(string) != uid {
		c.String(http.StatusInternalServerError, "504")
		return
	}

	fi := findIndex(st["products"].([]interface{}), s["pid"].(string))
	if fi != -1 {
		_, ok := st["products"].([]interface{})[fi].(bson.M)["active"]
		if ok {
			st["products"].([]interface{})[fi].(bson.M)["active"] = !st["products"].([]interface{})[fi].(bson.M)["active"].(bool)
		} else {
			st["products"].([]interface{})[fi].(bson.M)["active"] = true
		}
	}

	_, err = stores_col.UpdateOne(context.Background(), bson.M{"store_id": s["sid"].(string)}, bson.M{"$set": bson.M{"products": st["products"]}})
	if err != nil {
		c.String(http.StatusInternalServerError, "505")
		return
	}

	c.String(http.StatusOK, "updated")
}

func getID() string {
	charset := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
	result := make([]byte, 42)
	for i := 0; i < 42; i++ {
		if i%7 != 0 {
			result[i] = charset[rand.Intn(len(charset))]
		} else {
			result[i] = '-'
		}
	}
	return string(result[1:])
}

func contains(arr []string, str string) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}

func checkStore(stores []interface{}, sid string) bool {
	for _, store := range stores {
		if store.(bson.M)["store_id"].(string) == sid {
			return true
		}
	}
	return false
}

func findIndex(list []interface{}, pid string) int {
	for i, item := range list {
		if item.(bson.M)["pid"].(string) == pid {
			return i
		}
	}
	return -1
}


