import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://thadeualves.vercel.app',
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
});
