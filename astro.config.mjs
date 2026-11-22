import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sshConfigLanguage from '@shikijs/langs/ssh-config';
import { readFileSync } from 'node:fs';

const ubuntuAliases = JSON.parse(readFileSync(new URL('./src/data/ubuntuServerAliases.json', import.meta.url), 'utf8'));
const ubuntuAliasPaths = new Set(ubuntuAliases.map(({ slug }) => `/ubuntu-server/${slug}/`));
ubuntuAliasPaths.add('/ubuntu-server/runbook/');

export default defineConfig({
  site: 'https://daovanhung-dev.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !ubuntuAliasPaths.has(new URL(page).pathname.replace(/^\/portfolio(?=\/)/, '')),
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
