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

  {
    files: ['**/*.astro'],
    plugins: {
      astro: astro,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        project: true,
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        'astro': true,
        'Astro': true,
      },
    },
    rules: {
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'off',
    },
  },

  // Configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Configuration for .d.ts files
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Configuration for JavaScript config files
  {
    files: ['*.config.{js,mjs,cjs}', 'postcss.config.js', 'tailwind.config.js'],
    languageOptions: {
      globals: {
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },

  // Configuration for client-side scripts
  {
    files: ['src/scripts/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        window: true,
        document: true,
        getComputedStyle: true,
      },
    },
    rules: {
      'no-restricted-globals': 'off',
    },
  },

  // Ignore patterns
  {
    ignores: [
      '.astro/**',
      'dist/**',
      'node_modules/**',
      '*.min.js',
      'coverage/**',
      'eslint.config.mjs',
    ],
  },
);
