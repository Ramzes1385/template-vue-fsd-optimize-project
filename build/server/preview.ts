// build/server/preview.ts
import type { PreviewOptions } from 'vite'

import { previewHeaders } from './headers'

export const previewConfig: PreviewOptions = {
  host: '127.0.0.1',
  port: 4173,
  strictPort: true,
  headers: previewHeaders,
}
