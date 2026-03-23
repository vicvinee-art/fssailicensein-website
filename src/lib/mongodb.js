import { MongoClient } from "mongodb";

const uri = "mongodb+srv://vineet222905_db_user:rO5vjxxvrxT79Sc0@cluster0.fsb00vc.mongodb.net/?appName=Cluster0";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;