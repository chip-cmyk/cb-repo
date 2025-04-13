import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

interface SidebarGroup {
  title: string // 侧边栏分组标题
  dir: string // 相对于srcDir的目录路径
  collapsed?: boolean | undefined //是否折叠，默认为undefined（不显示折叠标志），为false时显示折叠标志且不折叠，为true时显示折叠标志并折叠
  ignoreFiles?: string[] // 忽略的文件名
}

interface AutoSidebarOptions {
  rootDir?: string // 覆盖默认的srcDir（需传绝对路径）
  basePath?: string // 覆盖默认的route base
  groups: SidebarGroup[] // 多分组配置
}

export default function autoSidebar(options: AutoSidebarOptions): Plugin {
  return {
    name: 'vite-plugin-auto-sidebar',
    enforce: 'pre', // 控制插件执行顺序
    configResolved(config) {
      const vitepress = (config as any).vitepress
      if (!vitepress) {
        console.warn('[autoSidebar] VitePress 配置未找到')
        return
      }

      // 处理路径配置
      const srcDir = options.rootDir || vitepress.srcDir || 'docs'
      const routeBase = options.basePath || vitepress.base || '/'

      // console.log('Resolved paths:', {
      //   srcDir,
      //   routeBase,
      //   cwd: process.cwd(),
      // })

      // 生成 sidebar 配置
      vitepress.site.themeConfig.sidebar = options.groups.map((group) => {
        // 计算物理路径
        const fullPath = path.join(srcDir, group.dir)
        // 关键修改：直接使用 group.dir 作为路由路径
        const routePath = path.posix.join(routeBase, group.dir)

        console.log('Processing group:', {
          group: group.title,
          fullPath,
          routePath,
        })

        const sidebar = {
          text: group.title,
          collapsed: group.collapsed,
          items: generateSidebarItems({
            fullPath,
            routePrefix: routePath, // 使用直接计算的路径
            ignoreFiles: group.ignoreFiles,
          }),
        }
        console.log(sidebar)
        return sidebar
      })
    },
  }
}

interface GenerateOptions {
  fullPath: string
  routePrefix: string
  ignoreFiles?: string[]
}

function generateSidebarItems(options: GenerateOptions) {
  if (!fs.existsSync(options.fullPath)) {
    console.warn(`[autoSidebar] 目录不存在: ${options.fullPath}`)
    return []
  }

  try {
    return fs
      .readdirSync(options.fullPath)
      .filter((file) => {
        const isMarkdown = file.endsWith('.md')
        const isIgnored = options.ignoreFiles?.includes(file)
        if (isIgnored) {
          console.log(`[autoSidebar] 忽略文件: ${file}`)
        }
        return isMarkdown && !isIgnored
      })
      .map((file) => {
        const filePath = path.join(options.fullPath, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const titleMatch = fileContent.match(/^title:\s*(.*)$/m)

        const routePath = path.posix.join(options.routePrefix, file.replace('.md', ''))

        console.log('Generated route:', {
          file,
          routePath,
        })

        return {
          text: titleMatch?.[1] || formatTitle(file.replace('.md', '')),
          link: routePath,
        }
      })
  } catch (err) {
    console.error(`[autoSidebar] 读取目录失败: ${options.fullPath}`, err)
    return []
  }
}

function formatTitle(filename: string) {
  return filename
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
