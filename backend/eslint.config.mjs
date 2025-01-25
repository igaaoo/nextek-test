// eslint.config.mjs
import eslint from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json', // Caminho para o tsconfig
        tsconfigRootDir: './', // Diretório raiz
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules, // Regras recomendadas para TypeScript
      'prettier/prettier': 'error', // Força o Prettier a ser seguido
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignora argumentos com "_"
      '@typescript-eslint/no-explicit-any': 'off', // Permite "any"
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Não exige tipos em exportações de funções
      '@typescript-eslint/ban-types': 'warn', // Avise sobre tipos banidos
      'brace-style': 'off' // Resolve o conflito de chaves entre ESLint e Prettier
    },
    ignores: [
      'node_modules', // Ignora a pasta node_modules
      'dist', // Ignora a pasta dist
      'build' // Ignora a pasta build
    ]
  },
  prettierConfig // Adiciona as configurações do Prettier
];
