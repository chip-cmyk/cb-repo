// .vitepress/utils/genSidebar.js
import fs from 'fs'
import path from 'path'

export function generateSidebar(basePath = '/components', filesDir = '../components') {
  // 检查目录是否存在
  const docsPath = path.join(__dirname, filesDir)
  if (!fs.existsSync(docsPath)) return []
  const files = fs
    .readdirSync(docsPath)
    .filter((file) => file.endsWith('.md') && file !== 'index.md')
  const routes = files.map((file) => ({
    text: file.replace('.md', ''),
    link: `${basePath}/${file.replace('.md', '')}`,
  }))
  return routes
}
