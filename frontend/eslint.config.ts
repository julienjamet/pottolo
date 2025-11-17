/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
/****************************************************/

/*************************************[ INTERFACES ]*/
import { Linter, FlatConfig } from '@typescript-eslint/utils/ts-eslint';
/****************************************************/
/************************************************************************/


/******************************************************[ ESLINT CONFIG ]*/
/******************************************[ TYPES ]*/
type RuleSet = Linter.RulesRecord;

type ExtendedConfig = FlatConfig.Config & {
    extends: FlatConfig.ConfigArray;
};
/****************************************************/


/*****************************************[ TARGET ]*/
// -- to target TS and TSX files only
const files: string[] = ['**/*.{ts,tsx}'];

// -- to ignore ESLint and Vite config files
const ignores: { ignores: string[] } = {
    ignores: ['eslint.config.ts', 'vite.config.ts']
};
/****************************************************/


/*******************************[ LANGUAGE OPTIONS ]*/
const languageOptions: FlatConfig.LanguageOptions = {
    // -- to indicate a browser ( frontend ) context
    globals: globals.browser,
    // -- to use the latest ECMAScript features
    ecmaVersion: 'latest',
    // -- to use ES modules ( import / export )
    sourceType: 'module',
    // -- to use TS config for type-based linting
    parserOptions: { project: './tsconfig.json' }
};
/****************************************************/


/***************************************[ TS RULES ]*/
// -- to use recommended TS linting rules
const basicTsRules: FlatConfig.ConfigArray = tseslint.configs.recommended;

// -- to enforce explicit type annotations in TypeScript
const additionalTsRules: RuleSet = {
    '@typescript-eslint/typedef': [
        'error', {
            // -- for variables
            variableDeclaration: true,
            // -- for function params
            parameter: true,
            // -- for class properties
            memberVariableDeclaration: true,
            // -- for object and interface properties
            propertyDeclaration: true
        }
    ]
};
/****************************************************/


/************************************[ REACT RULES ]*/
// -- to declare React plugins
const plugins: FlatConfig.Plugins = {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
};

const reactRules: RuleSet = {
    // -- to use recommended React hooks linting rules
    ...reactHooks.configs.recommended.rules,
    // -- to use custom React refresh linting rules
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
};
/****************************************************/


/***********************************[ STYLE RULES ]*/
const styleRules: RuleSet = {
    // -- to always require curly braces, even for single statements
    'curly': ['error', 'all'],

    // -- to enforce semicolons at the end of statements
    'semi': ['error', 'always'],

    // -- to enforce Stroustrup style and forbid single-line blocks
    'brace-style': ['error', 'stroustrup', { allowSingleLine: false }],

    // -- to add blank lines around control flow blocks
    'padding-line-between-statements': [
        'error',

        // -- blank line after if blocks
        { blankLine: 'always', prev: 'if', next: '*' },

        // -- blank line after for loops
        { blankLine: 'always', prev: 'for', next: '*' },

        // -- blank line after while loops
        { blankLine: 'always', prev: 'while', next: '*' },

        // -- blank line after switch statements
        { blankLine: 'always', prev: 'switch', next: '*' },

        // -- blank line after expression statements ( hooks )
        { blankLine: 'always', prev: '*', next: 'expression' },

        // -- blank line before return statements
        { blankLine: 'always', prev: '*', next: 'return' }
    ]
};
/****************************************************/


/*****************************************[ CONFIG ]*/
const tsReactConfig: ExtendedConfig = {
    files,
    languageOptions,
    plugins,
    rules: {
        ...additionalTsRules,
        ...reactRules,
        ...styleRules
    },
    extends: basicTsRules
};

const eslintConfig: FlatConfig.ConfigArray = tseslint.config(ignores, tsReactConfig);
/****************************************************/


export default eslintConfig;
/************************************************************************/