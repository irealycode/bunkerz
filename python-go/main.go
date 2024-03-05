package main

import (
	"github.com/farm-er/pyhon-go/server"
)

// trier files

// /register: create id from email to md5 add him to database
// /login normal return jwt token
// /addstore ->     #check if user exists
//   				#check if store is private
//    				#add store
//				    #update user
// /savestore -> #check if the owner is the user
//				 #save json input to inner in store table
// /getstore -> #check if search will be with subdomain or store_id
//				#return inner and products
// /uid -> #get uid from jwt and check if exists
//		   #return stores list

func main() {

	server := server.CreateServer("0.0.0.0:4242")

	server.Run()
}
