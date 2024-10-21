import { z } from 'zod';

// Blog Schema
export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().trim().nonempty('Title is required'),
    image: z.string().nonempty('Image is required'),
    description: z.string().trim().nonempty('Description is required'),
    content: z.string().nonempty('Content is required'),
    category: z.array(z.string()).nonempty('At least one category is required'),
    tags: z.array(z.string()).optional().default([]),
    isFeatured: z.boolean().optional().default(false),
  }),
});

// Blog Update Schema
export const updateBlogSchema = z.object({
  body: createBlogSchema.shape.body.partial(),
});

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
