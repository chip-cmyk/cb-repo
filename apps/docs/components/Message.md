---
title: Message
description: Message 组件的文档
---

# Message 消息提示

用于展示消息提示，通常用于操作成功或失败的反馈。

## 基础用法

通过`createMessage`创建消息提示框，使用 `type`、`message`、`duration` 和 `showClose` 来定义消息的样式和行为。`coloseMessageAll` 用于关闭所有消息提示框。

<preview path="../demo/Message/Basic.vue" title="基础用法" description="Message 组件的基础用法"></preview>

### Message Attributes

| Name        | Description                            | Type                                                             | Default |
| ----------- | -------------------------------------- | ---------------------------------------------------------------- | ------- |
| message     | message content                        | `string`                                                         | —       |
| type        | message type                           | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| duration    | message duration                      | `number`                                                         | 3000    |
| showClose   | whether to show close button          | `boolean`                                                        | false   |
