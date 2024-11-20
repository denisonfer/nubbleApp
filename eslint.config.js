const { fixupPluginRules } = require('@eslint/compat');
const pluginImport = require('eslint-plugin-import');
const pluginReactNative = require('eslint-plugin-react-native');
const pluginUnusedImports = require('eslint-plugin-unused-imports');
const tseslint = require('typescript-eslint');

module.exports = [
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  //default
  {
    name: '@promentech/eslint-config',
    plugins: {
      import: fixupPluginRules(pluginImport),
      'unused-imports': pluginUnusedImports,
      'react-native': fixupPluginRules(pluginReactNative),
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
        ecmaFeatures: { modules: true, jsx: true },
      },
    },
    rules: {
      ...pluginImport.configs.recommended.rules,
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': ['error'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'unused-imports/no-unused-imports': 'error',
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['block-like', 'function'], next: '*' },
        { blankLine: 'always', prev: ['*'], next: ['block-like', 'function'] },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          prev: ['export', 'import'],
          next: ['export', 'import'],
        },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['export'] },
      ],

      'import/order': [
        'error',
        {
          groups: ['external', 'builtin', 'internal', 'parent', 'sibling'],
          pathGroups: [
            {
              pattern: 'react+(|-native)',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@+(routes|screens|components|hooks|theme)',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react+(|-native)'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
  //typescript
  {
    name: '@promentech/eslint-config-typescript',
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
        ecmaFeatures: { modules: true, jsx: true },
      },
    },
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...pluginImport.configs.typescript.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: 'typeLike',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          custom: {
            regex: '^E[A-Z]',
            match: true,
          },
        },
      ],
    },
  },
];
