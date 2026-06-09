// build/vite.ts
import { defineConfig, mergeConfig } from 'vite';

import { aliases } from './aliases';
import { createVitePlugins } from './plugins';
import { optimizationConfig } from './optimization';
import { previewConfig, serverConfig, ssrConfig } from './server';

export function createViteConfig() {
  return defineConfig(({ mode }) => {
    const isProduction = mode === 'production';

    return mergeConfig(
      {
        plugins: createVitePlugins(),

        resolve: {
          alias: aliases,
        },

        server: serverConfig,

        preview: previewConfig,

        ssr: ssrConfig,

        define: {
          __DEV__: JSON.stringify(!isProduction),
          __PROD__: JSON.stringify(isProduction),
        },
      },
      optimizationConfig,
    );
  });
}
