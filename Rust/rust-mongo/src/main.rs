use mongodb::{Client, options::{ClientOptions, ResolverConfig}};
use std::env;

fn main() {
   // Load the MongoDB connection string from an environment variable:
   let client_uri =
      env::var("MONGODB_URI").expect("You must set the MONGODB_URI environment var!");

   println!("Connecting to MongoDB at: {}", client_uri);


}