import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    settings: {
      react: {
        version: 'detect',
      },
    },

    extensions: [
      'eslint: recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react-refresh/recommended',
      'plugin:@typescript-eslint/recommended',
    ],

    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react ': reactHooks,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'react-hooks/rules-of-hooks': ' error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/react-in-jsx-scope': 'off',
      ...js.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
    rules: {
      // Reglas específicas para archivos TS y JSX
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/react-in-jsx-scope': 'off',
      ...js.configs.recommended.rules,
      ...js.configs.recommended.plugins,
      ...js.configs.recommended.extends, // Extender las reglas de ESLint
      ...js.configs.recommended.parserOptions,
      ...js.configs.recommended.env, // Extender las reglas de ESLint
      ...js.configs.recommended.settings,
      ...js.configs.recommended.globals,
      ...js.configs.recommended.ignorePatterns,
    },
  },
];
