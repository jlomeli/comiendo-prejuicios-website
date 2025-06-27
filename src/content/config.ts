import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    featured: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'services': servicesCollection,
};
