import { incidentsRepo } from '../repo/incident.repo.js';

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

export const incidentsService = {
  getIncidents,
  getIncidentById,
};
