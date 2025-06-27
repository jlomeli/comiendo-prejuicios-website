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

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    credentials: z.string(),
    intro: z.string(),
    philosophy: z.string(),
    missionStatement: z.string().optional(),
    imageUrl: z.string(),
    education: z.array(z.string()).optional(),
    specialties: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'services': servicesCollection,
  'team': teamCollection,
};
