use mongodb::{ 
	bson::{Document, doc},
	Client,
	Collection 
};
use std::env;
use std::collections::HashMap;
use scraper::Html;
use scraper::Selector;



extern crate reqwest;
extern crate soup;


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

    // let document = Html::parse_document(html);

    // let h1 = document.select(&selector).next().unwrap();

    //parse the html response from the website

    let html = reqwest::get("https://google.com")
        .await?
        .text()
        .await?;

    let soup = soup::Soup::new(&html);
    
    println!("{:#?}", html);
    println!("{:#?}", soup);

    Ok(())
}
