/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // '@typescript-eslint/no-unused-vars': 'off' // 定义不使用 报警告
    'vue/multi-word-component-names': 'off', // 组件名称
    'no-undef': 'off' // 通用的
  }
}
