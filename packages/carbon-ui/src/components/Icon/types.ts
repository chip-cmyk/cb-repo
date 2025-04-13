import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'
export interface IconProps
  extends Omit<FontAwesomeIconProps, 'icon'>,
    Partial<Pick<FontAwesomeIconProps, 'icon'>> {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
  custom?: boolean
}
