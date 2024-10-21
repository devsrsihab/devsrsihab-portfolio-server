import { z } from 'zod';

// Experience Schema
export const createExperienceSchema = z.object({
  body: z.object({
    title: z.string().trim().nonempty('Title is required'),
    description: z.string().trim().nonempty('Description is required'),
    company: z.string().trim().nonempty('Company is required'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
});

// Experience Update Schema
export const updateExperienceSchema = z.object({
  body: createExperienceSchema.shape.body.partial(),
});

export const ExperienceValidation = {
  createExperienceSchema,
  updateExperienceSchema,
};
