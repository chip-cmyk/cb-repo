import { debounce } from 'lodash-es'
import { type ThemeType } from '@/components/ColorPicker/types'
import { reactive, onMounted } from 'vue'
export type ThemeColors = Partial<Record<ThemeType, string>>

export let initialThemeColors: Record<ThemeType, string> = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
}
export let currentThemeColors = reactive<Record<ThemeType, string>>({
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
})
onMounted(() => {
  initialThemeColors = {
    primary:
      typeof window !== 'undefined'
        ? (window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--cb-color-primary`)
            .trim() ?? '#409eff')
        : '#409eff',
    success:
      typeof window !== 'undefined'
        ? (window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--cb-color-success`)
            .trim() ?? '#67c23a')
        : '#67c23a',
    warning:
      typeof window !== 'undefined'
        ? (window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--cb-color-warning`)
            .trim() ?? '#e6a23c')
        : '#e6a23c',
    danger:
      typeof window !== 'undefined'
        ? (window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--cb-color-danger`)
            .trim() ?? '#f56c6c')
        : '#f56c6c',
    info:
      typeof window !== 'undefined'
        ? (window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--cb-color-info`)
            .trim() ?? '#909399')
        : '#909399',
  }
  currentThemeColors = {
    primary:
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--cb-color-primary`)
        .trim() ?? '##409eff',
    success:
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--cb-color-success`)
        .trim() ?? '#67c23a',
    warning:
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--cb-color-warning`)
        .trim() ?? '#e6a23c',
    danger:
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--cb-color-danger`)
        .trim() ?? '#f56c6c',
    info:
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--cb-color-info`)
        .trim() ?? '#909399',
  }
})

// 颜色混合计算（带类型校验）
export const mixColors = (base: string, target: string, ratio: number): string => {
  if (
    !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(base) ||
    !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(target)
  ) {
    console.warn('Invalid color format')
    return base
  }

  const parseHex = (hex: string) => {
    const fullHex = hex.length === 4 ? hex.replace(/([^#])/g, '$1$1') : hex
    return [
      parseInt(fullHex.slice(1, 3), 16),
      parseInt(fullHex.slice(3, 5), 16),
      parseInt(fullHex.slice(5, 7), 16),
    ]
  }

  const [r1, g1, b1] = parseHex(base)
  const [r2, g2, b2] = parseHex(target)

  const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// 颜色更新防抖时间（单位：毫秒）
export const COLOR_UPDATE_DEBOUNCE = 500

/**
 * 初始化所有主题颜色（应用启动时调用）
 */
export const initializeAllThemeColors = (): void => {
  const savedColors: ThemeColors = getThemeColorsFromStorage()
  for (const key in savedColors) {
    currentThemeColors[key as ThemeType] = savedColors[key as ThemeType] || ''
  }
  applyThemeColors(savedColors)
}

/**
 * 获取 LocalStorage 中的主题颜色配置
 */
export const getThemeColorsFromStorage = (): ThemeColors => {
  return JSON.parse(localStorage.getItem('themeColors') || '{}')
}

/**
 * 将颜色配置应用到 CSS 变量
 */
export const applyThemeColors = (colors: ThemeColors): void => {
  Object.entries(colors).forEach(([themeType, color]) => {
    updateThemeVariables(color, themeType as ThemeType)
  })
}

/**
 * 将颜色配置应用到 CSS 变量
 */
export const changeThemeColors = (colors: ThemeColors): void => {
  Object.entries(colors).forEach(([themeType, color]) => {
    updateThemeVariables(color, themeType as ThemeType)
    persistThemeColor(themeType as ThemeType, color)
  })
}

/**
 * 生成关联颜色变量并更新到 CSS
 * @param newColor 新颜色值
 * @param themeType 主题类型
 */
export const updateThemeVariables = (newColor: string, themeType: ThemeType) => {
  const root = document.documentElement.style

  // 更新主色变量
  root.setProperty(`--cb-color-${themeType}`, newColor)

  // 生成并更新关联色变量
  Array.from({ length: 9 }, (_, i) => i + 1).forEach((level) => {
    const ratio = level / 10

    root.setProperty(
      `--cb-color-${themeType}-light-${level}`,
      mixColors(newColor, '#ffffff', ratio),
    )

    root.setProperty(`--cb-color-${themeType}-dark-${level}`, mixColors(newColor, '#000000', ratio))
  })
  currentThemeColors[themeType] = newColor
}

/**
 * 保存颜色配置到 LocalStorage
 * @param themeType 主题类型
 * @param newColor 新颜色值
 */
export const persistThemeColor = (themeType: ThemeType, newColor: string) => {
  const config = JSON.parse(localStorage.getItem('themeColors') || '{}')
  config[themeType] = newColor
  localStorage.setItem('themeColors', JSON.stringify(config))
}

/**
 * 带防抖的主题更新方法
 */
export const debouncedUpdateTheme = debounce((newColor: string, themeType: ThemeType) => {
  updateThemeVariables(newColor, themeType)
  persistThemeColor(themeType, newColor)
}, COLOR_UPDATE_DEBOUNCE)

/**
 * 主题更新方法
 */
export const updateTheme = (newColor: string, themeType: ThemeType) => {
  updateThemeVariables(newColor, themeType)
  persistThemeColor(themeType, newColor)
}

// 重置主题颜色,移除 LocalStorage 中的主题颜色配置
export const resetThemeColors = () => {
  localStorage.removeItem('themeColors')
  Object.entries(initialThemeColors).forEach(([themeType, color]) => {
    updateThemeVariables(color, themeType as ThemeType)
    currentThemeColors[themeType as ThemeType] = color
  })
}
