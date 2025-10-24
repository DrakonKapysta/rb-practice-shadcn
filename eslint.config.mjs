import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    name: 'next',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  {
    name: 'react',
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    name: 'custom',
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [['^node:'], ['^\\w'], ['^@(?!/)\\w'], ['^@/'], ['^\\./'], ['^.+\\.?(css)$']],
        },
      ],
      'simple-import-sort/exports': 'warn',

      'no-console': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/pkg/libraries/locale` instead.',
        },
        {
          name: 'next/navigation',
          importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
          message: 'Please import from `@/pkg/libraries/locale` instead.',
        },
      ],
    },
  },

  {
    ignores: [
      'node_modules/',
      '.next/',
      './src/app/(payload)/(app)/admin/**',
      './src/app/(payload)/migrations/**',
      './src/app/(payload)/payload-types.ts',
    ],
  },
]
