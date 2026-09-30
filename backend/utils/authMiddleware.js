import jwt from 'jsonwebtoken';
import { email } from 'zod';

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error('Invalid or missing token!');
    error.status = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  req.user = user;

  next();
}
