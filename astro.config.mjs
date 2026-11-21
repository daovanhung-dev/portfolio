import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sshConfigLanguage from '@shikijs/langs/ssh-config';

export default defineConfig({
  site: 'https://daovanhung-dev.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/ubuntu-server\/[^/]+\/$/.test(new URL(page).pathname),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      langs: sshConfigLanguage.map((language) => ({ ...language, name: 'sshconfig' })),
    },
  },
});
