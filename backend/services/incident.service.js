import { incidentsRepo } from '../repo/incident.repo.js';
import { emitHelpers } from '../utils/socket.js';
import {
  createIncidentSchema,
  updateIncidentSchema,
  validateSchema,
} from '../utils/validation.js';

async function getIncidents(category) {
  const filter = category ? { category } : {};
  const result = await incidentsRepo.findIncidents(filter);

  const incidents = result.map((inc) => {
    const { _id, ...rest } = inc;
    return { id: _id.toString(), ...rest };
  });

  return incidents;
}

async function getIncidentById(id) {
  const incident = await incidentsRepo.findIncidentById(id);

  if (!incident) {
    const error = new Error('Incident not found!');
    error.status = 404;
    throw error;
  }

  const { _id, ...rest } = incident;

  return { id: _id.toString(), ...rest };
}

async function createIncident(incidentData, user) {
  validateSchema(createIncidentSchema, incidentData);

  const newIncident = {
    ...incidentData,
    status: 'open',
    createdBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await incidentsRepo.saveIncident(newIncident);

  const { _id, ...rest } = result;
  const created = { id: result.id, ...rest };
  emitHelpers.notifyIncidentCreated(created);

  return created;
}

async function updateIncident(user, incidentId, newData) {
  const incident = await getIncidentById(incidentId);

  if (incident.createdBy !== user.id && user.role !== 'admin') {
    const error = new Error('Forbidden action!');
    error.status = 403;
    throw error;
  }

  validateSchema(updateIncidentSchema, newData);

  newData.updatedAt = new Date();

  const result = await incidentsRepo.updateIncident(incidentId, newData);
  if (!result) {
    const error = new Error('Incident not found!');
    error.status = 404;
    throw error;
  }

  const { _id, ...rest } = result;
  const updated = { id: _id.toString(), ...rest };

  emitHelpers.notifyIncidentUpdated(updated);

  return updated;
}

async function deleteIncident(user, incidentId) {
  const incident = await getIncidentById(incidentId);

  if (incident.createdBy !== user.id && user.role !== 'admin') {
    const error = new Error('Forbidden action!');
    error.status = 403;
    throw error;
  }

  const result = await incidentsRepo.deleteIncident(incidentId);
  if (!result) {
    const error = new Error('Incident not found!');
    error.status = 404;
    throw error;
  }

  const { _id, ...rest } = result;
  const deleted = { id: _id.toString(), ...rest };

  emitHelpers.notifyIncidentDeleted(incidentId);

  return deleted;
}

export const incidentsService = {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
};
