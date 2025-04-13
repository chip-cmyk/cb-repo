import stylelintConfigStandard from 'stylelint-config-standard'
import stylelintConfigRecommendedVue from 'stylelint-config-recommended-vue'

// .stylelintrc.js
export default {
  // 继承基础配置
  extends: [
    'stylelint-config-standard', // 标准规则
    'stylelint-config-recommended-vue', // Vue 文件支持
  ],
  ignoreFiles: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  // 使用 PostCSS 解析器（支持嵌套语法等）
  customSyntax: 'postcss-syntax',
  // 规则配置
  rules: {
    // 禁用类名格式校验（允许 BEM 等任意格式）
    'selector-class-pattern': null,

    // 禁用所有空行相关规则
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'custom-property-empty-line-before': null,

    // 关闭样式规则
    'no-descending-specificity': null, // 选择器特异性顺序
    'no-duplicate-selectors': null, // 重复选择器
    'comment-whitespace-inside': null, // 注释内空格
    'value-keyword-case': null, // 属性值大小写
    'at-rule-no-unknown': null, // 未知@规则
    'color-hex-length': null, // 色值缩写
    'import-notation': null, // @import 语法
    'custom-property-pattern': null, // 自定义属性名
    'property-no-vendor-prefix': null, // 厂商前缀

    // 启用的重要规则
    'property-no-unknown': true, // 未知属性检查
    'declaration-property-value-no-unknown': true, // 未知属性值检查
    'declaration-block-no-duplicate-properties': true, // 重复属性
  },

  // 针对 Vue 文件的特殊配置
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html', // Vue 文件解析器
      rules: {
        // 允许 Vue 的特殊伪元素
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
  ],
}
