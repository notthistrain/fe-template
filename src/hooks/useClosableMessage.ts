import type { MessageInstance } from 'ant-design-vue/es/message'
import CloseCircleOutlined from '@ant-design/icons-vue/CloseCircleOutlined'
import { Button, message } from 'ant-design-vue'

interface CloseableMessage {
  (content: string, duration?: number): void
}

type CloseableAction = 'success' | 'error' | 'warning' | 'info'

function closeableMessage(type: keyof MessageInstance, content: string, duration = 0): void {
  const key = Date.now()
  const btn = h(
    Button,
    {
      style: { marginLeft: '8px', fontSize: '14px' },
      onClick: () => message.destroy(key),
    },
    () => [h(CloseCircleOutlined)],
  )

  message[type]({
    content: h('span', [content, btn]),
    key,
    duration,
  })
}

export function useCloseableMessage(): Record<CloseableAction, CloseableMessage> {
  return {
    success: (content, duration) => closeableMessage('success', content, duration),
    error: (content, duration) => closeableMessage('error', content, duration),
    warning: (content, duration) => closeableMessage('warning', content, duration),
    info: (content, duration) => closeableMessage('info', content, duration),
  }
}
