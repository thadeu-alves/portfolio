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

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    logo: z.string().optional(),
    dateRange: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
    link: z.string().url().optional(),
    current: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
  }),
});

const education = defineCollection({
  type: 'content',
  schema: z.object({
    institution: z.string(),
    course: z.string(),
    logo: z.string().optional(),
    dateRange: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    credential: z.string().optional(),
    credentialUrl: z.string().url().optional(),
    isCertification: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
  }),
});

export const collections = { projects, experience, education };
