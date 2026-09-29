import { z } from 'zod';

export const userSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

export function validateSchema(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const error = new Error(result.error.issues[0].message);
    error.status = 400;
    throw error;
  }
}
