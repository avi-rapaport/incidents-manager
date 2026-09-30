import { z } from 'zod';

export const userSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

export const createIncidentSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['fire', 'flood', 'accident', 'medical', 'other']),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
});

export const updateIncidentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z
    .enum(['fire', 'flood', 'accident', 'medical', 'other'])
    .optional(),
  location: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  status: z.enum(['open', 'in-progress', 'closed']).optional(),
});

export function validateSchema(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const error = new Error(result.error.issues[0].message);
    error.status = 400;
    throw error;
  }

  body = result.data;
}
