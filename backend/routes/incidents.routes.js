import express from 'express';
import { incidentsService } from '../services/incident.service.js';
import { authMiddleware } from '../utils/authMiddleware.js';

export const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const { category } = req.query;

  const incidents = await incidentsService.getIncidents(category);

  res.json({ success: true, data: incidents });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const incident = await incidentsService.getIncidentById(id);

  res.json({ success: true, data: incident });
});

router.post('/', async (req, res) => {
  const { body, user } = req;

  const created = await incidentsService.createIncident(body, user);

  res.json({ success: true, data: created });
});

router.patch('/:id', async (req, res) => {
  const { body, user } = req;
  const { id } = req.params;

  const updated = await incidentsService.updateIncident(user, id, body);

  res.json({ success: true, data: updated });
});

router.delete('/:id', async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const deleted = await incidentsService.deleteIncident(user, id);

  res.json({ success: true, data: deleted });
});
