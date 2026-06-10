import { defineConfig, mergeConfig } from 'vite'

import { aliases } from './aliases'
import { optimizationConfig } from './optimization'
import { createVitePlugins } from './plugins'
import { previewConfig, serverConfig, ssrConfig } from './server'
import { cssConfig } from './styles'

export function createViteConfig() {
  return defineConfig(({ mode }) => {
    const isProduction = mode === 'production'

    return mergeConfig(
      {
        plugins: createVitePlugins(),
        resolve: {
          alias: aliases,
        },
        ssr: ssrConfig,
        css: cssConfig,
        server: serverConfig,
        preview: previewConfig,
        define: {
          __DEV__: JSON.stringify(!isProduction),
          __PROD__: JSON.stringify(isProduction),
        },
      },
      optimizationConfig,
    )
  })
}
