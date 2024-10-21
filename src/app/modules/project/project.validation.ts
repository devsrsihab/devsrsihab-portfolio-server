import { z } from 'zod';

// Project Schema
export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().trim().nonempty('Title is required'),
    image: z.string().nonempty('Image is required'),
    description: z.string().trim().optional(),
    content: z.string().nonempty('Content is required'),
    technologies: z.string().nonempty('Technologies ID is required'),
    frontendGithubLink: z.string().url('Invalid frontend GitHub link'),
    backendGithubLink: z.string().url('Invalid backend GitHub link'),
    frontendLiveLink: z.string().url('Invalid frontend live link'),
    backendLiveLink: z.string().url('Invalid backend live link'),
    isFeatured: z.boolean().optional().default(false),
  }),
});

// Project Update Schema
export const updateProjectSchema = z.object({
  body: createProjectSchema.shape.body.partial(),
});

export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema,
};
