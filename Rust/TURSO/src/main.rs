mod database;

use database::embeded_database;


#[tokio::main]
async fn main() {     
    embeded_database::embeded_database().await
}