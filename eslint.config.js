import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'docs/audit/git-logs/**', 'test-results/**', 'playwright-report/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/main.ts', 'src/routes.ts', 'src/data/evidence.ts', 'src/data/portfolio-content.ts', 'src/data/repositories.ts', 'scripts/validate-project-data.mjs', 'scripts/validate-links.mjs', 'tests/**/*.ts', 'e2e/**/*.ts', 'playwright.config.ts'],
    languageOptions: {
      globals: {
        AbortController: 'readonly', Element: 'readonly', HTMLAnchorElement: 'readonly', HTMLButtonElement: 'readonly', HTMLDialogElement: 'readonly', HTMLInputElement: 'readonly', HTMLMetaElement: 'readonly', HTMLElement: 'readonly', URL: 'readonly',
        console: 'readonly', document: 'readonly', fetch: 'readonly', process: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', window: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
);
