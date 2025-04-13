import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '@/hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destroy = () => {
    const idx = instances.findIndex((instance) => instance.id === id)
    instances.splice(idx, 1)
    render(null, container)
    container.remove()
  }

  const newProps = {
    ...props,
    id,
    onDestroy: destroy,
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy,
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) return 0
  const prev = instances[idx - 1]
  //以下方式虽然可以获取到bottomOffset的值,但是依赖 DOM 操作（$el），计算的是 ​布局位置，而非响应式数据。如果 bottomOffset 是计算属性或 ref，这种方式无法同步更新。
  // console.log(prev.vm.proxy!.$el.getBoundingClientRect().bottom,'prev.vm.proxy!.$el.getBoundingClientRect().bottom');
  return prev.vm.exposed!.bottomOffset.value
}

export const getLastZIndex = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) return useZIndex().initialZIndex.value
  const prev = instances[idx - 1]
  return prev.vm.exposed!.zIndex.value
}

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destroy()
  })
}
