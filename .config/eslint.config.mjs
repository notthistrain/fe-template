import antfu from '@antfu/eslint-config'
import autoimport from './.eslintrc-auto-import.mjs'

export default antfu({
  languageOptions: {
    globals: autoimport?.globals,
  },
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  vue: true,
  formatters: {
    css: true,
    html: true,
  },
  rules: {
    /*
      "off" or 0 - 关闭规则
      "warn" or 1 - 将规则视为一个警告（不会影响退出码）
      "error" or 2 - 将规则视为一个错误 (退出码为1)
    */
    'vue/no-multiple-template-root': 'off', // template只允许有一个根标签, vue3不适用
    'vue/require-default-prop': 'off', // prop需要默认值
    'vue/require-prop-types': 'off', // prop需要指定类型
    'vue/multi-word-component-names': 'off', // vue组件名称命名规则
    'vue/no-v-model-argument': 'off',
    'vue/no-v-for-template-key': 'off', // vue3中template上可以使用key, 见文档: https://cn.vuejs.org/guide/essentials/list#maintaining-state-with-key
    'vue/no-v-html': 'off', // no-v-html存在XSS攻击风险
    'no-prototype-builtins': 'off',
    'no-new-func': 'off',
    'no-undef': 'warn',
    'no-undef-init': 'warn',
    'prefer-promise-reject-errors': 'off', // Promise被拒绝（rejected）的返回值是一个Error对象
    'no-case-declarations': 1, // switch无块级作用域, 所以不要在switch的case里用const/let, 或用{}将case包装成一个代码块
    // === 而不是 ==
    'eqeqeq': [1, 'always', { null: 'ignore' }],
    'camelcase': [1, { properties: 'always' }],
    // 代码缩进
    'indent': [1, 2, {
      SwitchCase: 1,
      ignoredNodes: ['ConditionalExpression'],
      flatTernaryExpressions: false,
    }],
    // 定义未使用的校验
    'no-unused-vars': [1, { vars: 'all', args: 'none' }],
    // 其他规则可自行添加
  },
})
