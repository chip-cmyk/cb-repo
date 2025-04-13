import postcssNested from 'postcss-nested'
import postcssEachVariables from 'postcss-each-variables'
import postcssEach from 'postcss-each'
import postcssFor from 'postcss-for'
import postcssColorMix from 'postcss-color-mix'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    postcssEachVariables(),
    postcssNested(/* pluginOptions */),
    postcssEach({
      plugins: {
        beforeEach: [postcssFor(), postcssColorMix()],
      },
    }),
    // 删除所有 reduce-motion 媒体查询css选择器
    {
      postcssPlugin: 'remove-all-reduce-motion',
      AtRule: {
        media: (atRule) => {
          if (/prefers-reduced-motion:\s*reduce/i.test(atRule.params)) {
            atRule.remove()
          }
        },
      },
    },
    autoprefixer(),
    cssnano(),
  ],
}
