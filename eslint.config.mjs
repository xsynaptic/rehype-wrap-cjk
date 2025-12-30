// @ts-check -- ESLint still lacks support for config files in native TypeScript
import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import unicornPlugin from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const config = defineConfig(
  {
    ignores: ['**/node_modules', '**/dist', 'dist/**/*', '**/node_modules'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs', 'tests/*.test.ts'],
        },
      },
      globals: {
        ...globals.builtin,
        ...globals.nodeBuiltin,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
    },
  },
  unicornPlugin.configs.recommended,
  {
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          case: 'kebabCase',
          ignore: [String.raw`^(README|TODO)\.md$`],
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
    },
  }
);

export default config;
