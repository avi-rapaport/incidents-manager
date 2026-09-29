import express from 'express';
import { authService } from '../services/auth.service.js';
import { authMiddleware } from '../utils/authMiddleware.js';

export const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.register(email, password);
  res.json({ success: true, data: result });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
});

router.get('/me', authMiddleware, async (req, res) => {
  res.json({ success: true, data: req.user });
});
