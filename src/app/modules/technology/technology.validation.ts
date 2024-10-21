import { z } from 'zod';

// Technology Schema
export const createTechnologySchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty('Name is required'),
    image: z.string().trim().nonempty('Image is required'),
  }),
});

// Technology Update Schema
export const updateTechnologySchema = z.object({
  body: createTechnologySchema.shape.body.partial(),
});

export const TechnologyValidation = {
  createTechnologySchema,
  updateTechnologySchema,
};
