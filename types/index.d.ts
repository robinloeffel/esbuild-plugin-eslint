import { ESLint } from 'eslint';
import { Plugin } from 'esbuild';

declare function eslint(options?: ESLint.Options): Plugin;

export = eslint;
