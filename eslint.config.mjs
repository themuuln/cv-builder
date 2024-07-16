import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { fixupConfigRules } from '@eslint/compat';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': [
        'warn',
        {
          jsxSingleQuote: true,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          bracketSameLine: false,
          printWidth: 80,
          tabWidth: 2,
          semi: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
];
