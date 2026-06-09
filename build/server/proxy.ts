// build/server/proxy.ts
import type { ServerOptions } from 'vite'

const API_TARGET = process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:3000'

export const proxyConfig: ServerOptions['proxy'] = {
  '/api': {
    target: API_TARGET,
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}
