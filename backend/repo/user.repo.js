import { Collection } from 'mongodb';
import { connectDB } from '../db/db.js';

async function getCollection() {
  const db = await connectDB();
  /** @type {Collection} */
  const collection = db.collection('users');
  return collection;
}

async function saveUser(userData) {
  const collection = await getCollection();
  const result = await collection.insertOne(userData);
  return { id: result.insertedId.toString(), ...userData };
}

async function getUserByEmail(email) {
  const collection = await getCollection();
  const user = await collection.findOne({ email });
  return user;
}

export const userRepo = { saveUser, getUserByEmail };
