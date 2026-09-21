import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    link: z.string().url(),
    description: z.string(),
    // Use a URL string for now. When you have real screenshots in
    // src/assets/projects/, switch to: image: image() from the schema
    // helper and <Image /> in ProjectCard.astro.
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { projects };
