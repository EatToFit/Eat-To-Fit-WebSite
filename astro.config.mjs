import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import clerk from '@clerk/astro';
import { faIR } from '@clerk/localizations';

export default defineConfig({
  output: 'server',

  adapter: cloudflare({
    imageService: 'compile',
  }),

  integrations: [
    clerk({
      localization: faIR,
    }),
  ],

  session: false,

  trailingSlash: 'never',

  compressHTML: true,

  build: {
    format: 'directory'
  }
});