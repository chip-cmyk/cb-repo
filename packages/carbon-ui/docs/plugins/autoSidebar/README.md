# Auto Sidebar Plugin (English)

`vite-plugin-vitepress-auto-sidebar` is a Vite plugin for automatically generating sidebar configurations for VitePress.

## Features

- Automatically scans Markdown files in the specified directory.
- Generates sidebar entries based on filenames and content.
- Supports ignoring specific files.
- Supports grouping and collapsing configurations.

## Installation

```bash
npm install @ptpchips/vite-plugin-vitepress-auto-sidebar
```

## Usage

### Configure the Plugin

Import the plugin in the `vitepress` configuration file:

```typescript
import autoSidebar from '@ptpchips/vite-plugin-vitepress-auto-sidebar'

export default defineConfig({
  vite: {
    plugins: [
      autoSidebar({
        groups: [
          {
            title: 'Components',
            dir: 'components',
            ignoreFiles: ['internal.md'],
          },
          {
            title: 'Guides',
            dir: 'guides',
            collapsed: true,
          },
        ],
      }),
    ],
  },
})
```

### Configuration Options

- `rootDir`: The root directory to scan files (default: `docs`).
- `basePath`: The base path for routes (default: `/`).
- `groups`: Sidebar group configuration with the following properties:
  - `title`: Group title.
  - `dir`: Directory to scan.
  - `collapsed`: Whether the group is collapsed by default.
  - `ignoreFiles`: List of files to ignore.

### Example

Assume the following directory structure:

```
components/
  Button.md
  Input.md
guides/
  GettingStarted.md
  internal.md
```

The generated sidebar configuration will be:

```json
[
  {
    "text": "Components",
    "items": [
      { "text": "Button", "link": "/components/Button" },
      { "text": "Input", "link": "/components/Input" }
    ]
  },
  {
    "text": "Guides",
    "collapsed": true,
    "items": [{ "text": "Getting Started", "link": "/guides/GettingStarted" }]
  }
]
```

### Notes

- Ensure the specified directory exists; otherwise, a warning will be output.
- Filenames are automatically formatted as titles, and the `title` field in the file content can override the default title.

---

# Auto Sidebar Plugin

`vite-plugin-vitepress-auto-sidebar` 是一个 Vite 插件，用于自动生成 VitePress 的侧边栏配置。

## 功能

- 自动扫描指定目录中的 Markdown 文件。
- 根据文件名和内容生成侧边栏条目。
- 支持忽略特定文件。
- 支持分组和折叠配置。

## 安装

```bash
npm install @ptpchips/vite-plugin-vitepress-auto-sidebar
```

## 使用方法

### 配置插件

在 `vitepress` 的配置文件中引入插件：

```typescript
import autoSidebar from '@ptpchips/vite-plugin-vitepress-auto-sidebar'

export default defineConfig({
  vite: {
    plugins: [
      autoSidebar({
        groups: [
          {
            title: 'Components',
            dir: 'components',
            ignoreFiles: ['internal.md'],
          },
          {
            title: 'Guides',
            dir: 'guides',
            collapsed: true,
          },
        ],
      }),
    ],
  },
})
```

### 配置选项

- `rootDir`：扫描文件的根目录（默认值：`docs`）。
- `basePath`：路由的基础路径（默认值：`/`）。
- `groups`：侧边栏分组配置，包含以下属性：
  - `title`：分组标题。
  - `dir`：扫描的目录。
  - `collapsed`：是否默认折叠分组。
  - `ignoreFiles`：忽略的文件列表。

### 示例

假设目录结构如下：

```
components/
  Button.md
  Input.md
guides/
  GettingStarted.md
  internal.md
```

生成的侧边栏配置为：

```json
[
  {
    "text": "Components",
    "items": [
      { "text": "Button", "link": "/components/Button" },
      { "text": "Input", "link": "/components/Input" }
    ]
  },
  {
    "text": "Guides",
    "collapsed": true,
    "items": [{ "text": "Getting Started", "link": "/guides/GettingStarted" }]
  }
]
```

### 注意事项

- 确保指定的目录存在，否则会输出警告。
- 文件名会自动格式化为标题，支持通过文件内容中的 `title` 字段覆盖默认标题。
