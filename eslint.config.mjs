// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

export default tseslint.config(
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Astro ESLint recommended rules
  ...astro.configs.recommended,

  // Configuration for Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      // Disable linting for generated files within .astro
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Configuration for TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // Configuration for JavaScript files (like config files)
  {
    files: ['postcss.config.js', 'tailwind.config.js'],
    languageOptions: {
      globals: {
        node: true,
      },
    },
    rules: {
      // Disable specific rules that might conflict with config files
      'no-undef': 'off', // 'module' is defined by Node.js
    },
  },

  // Configuration for client-side JavaScript files
  {
    files: ['src/scripts/read-more.js'],
    languageOptions: {
      globals: {
        document: true,
      },
    },
  },

  // Ignore generated files
  {
    ignores: ['.astro/**'],
  },
);
