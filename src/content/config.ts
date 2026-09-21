import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      link: z.string().url(),
      description: z.string(),
      image: image(),
      tags: z.array(z.string()).optional().default([]),
    }),
});

export const collections = { projects };
