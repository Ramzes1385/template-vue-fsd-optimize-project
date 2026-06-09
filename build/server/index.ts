// build/server/index.ts
import type { ServerOptions } from 'vite'

import { devHeaders } from './headers'
import { previewConfig } from './preview'
import { proxyConfig } from './proxy'
import { ssrConfig } from './ssr'

export const serverConfig: ServerOptions = {
  host: '127.0.0.1',
  port: 5173,
  strictPort: false,

  headers: devHeaders,
  proxy: proxyConfig,
}

export { previewConfig, ssrConfig }
