use dotenv::dotenv;
use std::env;
use libsql::Builder;


pub async fn embeded_database() {
    // Load the .env file
    dotenv().ok();

    // Access environment variables
    let url = env::var("TURSO_DATABASE_URL").expect("TURSO_DATABASE_URL not set in .env");
    let token = env::var("TURSO_AUTH_TOKEN").expect("TURSO_AUTH_TOKEN not set in .env");

    // Print the environment variables
    // Generate a connection using libsql
    let db = Builder::new_remote(url, token).build().await.unwrap();

    let conn = db.connect().unwrap();

    conn.execute("CREATE TABLE IF NOT EXISTS users (email TEXT)", ()).await.unwrap();
    conn.execute("INSERT INTO users (email) VALUES ('alice@example.org')", ()).await.unwrap();
}