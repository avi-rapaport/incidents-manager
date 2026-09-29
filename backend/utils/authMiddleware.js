import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      const error = new Error('Invalid or missing token!');
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    const error = new Error('Invalid or expired token!');
    error.status = 401;
    next(error);
  }
}
