import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'danger'
  onDestroy: () => void
  id: string
  offset?: number
  transitionName?: string
}

export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
  destroy: () => void
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id'>
