// build/plugins.ts
import { constants } from 'node:zlib'

import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export function createVitePlugins() {
  return [
    vue(),

    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 65,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),

    compression({
      algorithms: [
        'gzip',

        defineAlgorithm('brotliCompress', {
          params: {
            [constants.BROTLI_PARAM_QUALITY]: 11,
          },
        }),
      ],
      threshold: 10240,
      deleteOriginalAssets: false,
      skipIfLargerOrEqual: true,
    }),

    visualizer({
      filename: 'reports/bundle/bundle-report.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ]
}
