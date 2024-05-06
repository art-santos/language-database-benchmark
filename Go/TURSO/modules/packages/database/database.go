package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

type Database struct {
	// Define your database struct fields here
}

type User struct {
	ID   int
	Name string
}

func createUser(db *sql.DB) {
	_, err := db.Exec("INSERT INTO users (email) VALUES ('John')")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
		os.Exit(1)
	}
}

func NewDatabase() *Database {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	url := os.Getenv("TURSO_DATABASE_URL")
	log.Println("TURSO DATABASE:", url)

	token := os.Getenv("TURSO_AUTH_TOKEN")
	log.Println("TURSO TOKEN:", token)

	conn := fmt.Sprintf("%s?authToken=%s", url, token)

	log.Println("Connecting to database:", conn)

	// Implement your database initialization logic here

	db, err := sql.Open("libsql", conn)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open db %s: %s", url, err)
		os.Exit(1)
		log.Fatal(err)
	}

	//Measuring the time it takes to connect to the database

	start := time.Now()
	createUser(db)
	elapsed := time.Since(start)
	log.Printf("Time taken to execute createUser: %s", elapsed)

	log.Println("Connected to database")
	defer db.Close()

	return &Database{}
}
