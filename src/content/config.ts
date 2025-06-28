import { defineCollection, z } from 'astro:content';

// Define schemas
const servicesSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  featured: z.boolean().optional(),
  image: z.string().optional(),
});

const teamSchema = z.object({
  name: z.string(),
  credentials: z.string(),
  intro: z.string(),
  philosophy: z.string(),
  missionStatement: z.string().optional(),
  imageUrl: z.string(),
  education: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
});

// Define collections
const servicesCollection = defineCollection({
  type: 'content',
  schema: servicesSchema,
});

const teamCollection = defineCollection({
  type: 'content',
  schema: teamSchema,
});

// Export collections and their types
export const collections = {
  'services': servicesCollection,
  'team': teamCollection,
};

// Export type inference helpers
export type ServicesSchema = z.infer<typeof servicesSchema>;
export type TeamSchema = z.infer<typeof teamSchema>;
