package main

import (
	"fmt"
	"modules/packages/database"
)

func main() {
	fmt.Println("Hello, Modules!")

	var db = database.NewDatabase()

	fmt.Print("Database: ", db, "\n")
}
