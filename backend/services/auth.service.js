import { userRepo } from '../repo/user.repo.js';
import bcrypt from 'bcrypt';
import { validateSchema, userSchema } from '../utils/validation.js';
import { generateToken } from '../utils/generateToken.js';

async function register(email, password) {
  validateSchema(userSchema, { email, password });

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = {
    email,
    passwordHash: hashedPassword,
    role: 'user',
    createdAt: new Date(),
  };

  const user = await userRepo.saveUser(newUser);

  const { passwordHash, ...userData } = user;

  const token = generateToken({
    id: userData.id,
    email: userData.email,
    role: userData.role,
  });

  return { userData, token };
}

async function login(email, password) {
  validateSchema(userSchema, { email, password });

  const user = await userRepo.getUserByEmail(email);
  if (!user) {
    const error = new Error('User not found!');
    error.status = 404;
    throw error;
  }

  const isAuthenticated = await bcrypt.compare(password, user.passwordHash);
  if (!isAuthenticated) {
    const error = new Error('Incorrect password!');
    error.status = 401;
    throw error;
  }

  const { _id, passwordHash, ...rest } = user;
  const userData = { id: _id.toString(), ...rest };

  const token = generateToken({
    id: userData.id,
    email: userData.email,
    role: userData.role,
  });

  return { userData, token };
}

export const authService = { register, login };
