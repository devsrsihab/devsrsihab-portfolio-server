import { z } from 'zod';

// Experience Schema
export const createSkillSchema = z.object({
  body: z.object({
    experince: z.string().trim().optional(),
    technology: z.string().trim().nonempty('Technology is required'),
  }),
});

// Experience Update Schema
export const updateSkillSchema = z.object({
  body: createSkillSchema.shape.body.partial(),
});

export const SkillValidation = {
  createSkillSchema,
  updateSkillSchema,
};
