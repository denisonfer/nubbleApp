const { fixupPluginRules } = require('@eslint/compat');
const pluginImport = require('eslint-plugin-import');
const pluginUnusedImports = require('eslint-plugin-unused-imports');
const parser = require('@typescript-eslint/parser');
const typeScriptEslint = require('@typescript-eslint/eslint-plugin');

module.exports = {
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  /* settings: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    
  ] */ plugins: {
    import: fixupPluginRules(pluginImport),
    'unused-imports': pluginUnusedImports,
    '@typescript-eslint': typeScriptEslint,
  },
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 10,
      sourceType: 'module',
      ecmaFeatures: { modules: true, jsx: true },
    },
  },
  files: ['*.ts', '*.tsx'],
  rules: {
    ...pluginImport.configs.recommended.rules,
    ...pluginImport.configs.typescript.rules,
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
};
