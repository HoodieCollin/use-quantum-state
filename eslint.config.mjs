// @ts-check

import globals from 'globals';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const final = tseslint.config(
  {
    ignores: ['.tmp', 'node_modules', 'dist', 'eslint.config.mjs'],
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.plugins('react', 'react-hooks'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...Object.fromEntries(
          Object.entries(globals.amd).map(([key]) => [key, 'off'])
        ),
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key]) => [key, 'off'])
        ),
      },

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/prefer-literal-enum-member': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      '@typescript-eslint/no-unused-vars': [
        2,
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/restrict-template-expressions': [
        1,
        {
          allowNumber: true,
        },
      ],

      'react/no-unknown-property': [
        2,
        {
          ignore: ['jsx', 'global'],
        },
      ],
    },
  }
);

export default final;
