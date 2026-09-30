import { Collection, ObjectId } from 'mongodb';
import { connectDB } from '../db/db.js';

async function getCollection() {
  const db = await connectDB();
  /** @type {Collection} */
  const collection = db.collection('incidents');
  return collection;
}

async function findIncidents(filter) {
  const collection = await getCollection();
  const incidents = await collection.find(filter).toArray();
  return incidents;
}

async function findIncidentById(id) {
  const collection = await getCollection();
  const incident = await collection.findOne({ _id: new ObjectId(id) });
  return incident;
}

async function saveIncident(incidentData) {
  const collection = await getCollection();
  const incident = await collection.insertOne(incidentData);
  return { id: incident.insertedId.toString(), ...incidentData };
}

async function updateIncident(id, newData) {
  const collection = await getCollection();
  const updated = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: newData },
    { returnDocument: 'after' }
  );
  return updated;
}

async function deleteIncident(id) {
  const collection = await getCollection();
  const deleted = await collection.findOneAndDelete({ _id: new ObjectId(id) });
  return deleted;
}

export const incidentsRepo = {
  findIncidents,
  findIncidentById,
  saveIncident,
  updateIncident,
  deleteIncident,
};
