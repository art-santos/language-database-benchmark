use mongodb::{ 
	bson::{Document, doc},
	Client,
	Collection 
};
use std::env;
use std::collections::HashMap;


#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize MongoDB client
    let uri = env::var("MONGODB_URI").expect("You must set the MONGODB_URI environment var!");

    let client = Client::with_uri_str(uri).await?;

    // Get a handle on the movies collection
    let database = client.database("sample_mflix");
    let my_coll: Collection<Document> = database.collection("movies");

    // Find a movie based on the title value
    let my_movie = my_coll.find_one(doc! { "title": "The Perils of Pauline" }).await?;

    // Print the document
    println!("Found a movie:\n{:#?}", my_movie);

    // Make a request to httpbin.org and print the response
    let resp = reqwest::get("https://httpbin.org/ip")
        .await?
        .json::<HashMap<String, String>>()
        .await?;
    println!("--->{resp:#?}");


    //add a new movie to the collection with the ip address
    let ip = resp.get("origin").unwrap();
    println!("ip address: {}", ip);

    Ok(())
}
