import 'dotenv/config';
import { MongoClient } from 'mongodb';

let client, db;

export async function connectDB() {
  if (!db) {
    client = new MongoClient(process.env.MOMGODB_URI);
    console.log('Mongo client connecting...');
    await client.connect();
    db = client.db('incidents-manager');
  }
  return db;
}
