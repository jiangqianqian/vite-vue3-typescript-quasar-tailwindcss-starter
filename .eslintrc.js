const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser', // 解析 template
  parserOptions: {
    parser: '@typescript-eslint/parser', // 自定义解析器去解析 <script>
    ecmaVersion: 2021, // 使用最新支持的版本
    sourceType: 'module', // ES 模块
    ecmaFeatures: {
      jsx: true // 支持 JSX
    }
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json' // 防止 eslint 对 ref 等全局变量检查报错
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-template-shadow': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
})
