package main

import (
	"fmt"

	"modules/mypackage"
	"modules/packages/database"
)

func main() {
	fmt.Println("Hello, Modules!")

	mypackage.PrintHello()
	var db = database.NewDatabase()

	fmt.Print("Database: ", db, "\n")
}
