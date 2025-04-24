---
title: Theme
description: 自定义主题色
---



# 修改主题色

如需修改主题色，请按照以下步骤进行操作。

## 配置postcss

安装`postcss`和相关插件。

```bash
pnpm add -D postcss postcss-nested postcss-each-variables postcss-each postcss-for postcss-color-mix postcss-preset-env
```

在项目根目录下创建`postcss.config.js`文件，并添加以下内容。

```js
import postcssNested from 'postcss-nested'
import postcssEachVariables from 'postcss-each-variables'
import postcssEach from 'postcss-each'
import postcssFor from 'postcss-for'

export default {
  plugins: [
    postcssEachVariables(/* pluginOptions */),
    postcssNested(/* pluginOptions */),
    postcssEach({
      plugins: {
        beforeEach: [postcssFor(), postcssColorMix()],
      },
    }),
  ],
}
```

在自定义css文件中加入以下代码，并将该css文件引入`main`入口文件。以下定义了一些 CSS 变量，可以根据需要修改`--colors`中各变量的值。

```css
:root {
  --colors: (primary: #409eff, success: #67c23a, warning: #e6a23c, danger: #f56c6c, info: #909399);

  @each $val, $color in var(--colors) {
    --cb-color-$(val): $(color);
    @for $i from 1 to 9 by 1 {
      --cb-color-$(val)-light-$(i): mix(#fff, $(color), .$(i));
      --cb-color-$(val)-dark-$(i): mix(#000, $(color), .$(i));
    }
  }
}
```