// build/optimization.ts
import type { UserConfig } from 'vite'

import { manualChunks } from './chunks'

export const optimizationConfig: UserConfig = {
  build: {
    outDir: 'dist',
    assetsDir: 'assets',

    emptyOutDir: true,
    sourcemap: false,

    cssCodeSplit: true,

    // В Vite 8 дефолт для JS — Oxc, но укажем явно.
    // Не используем 'esbuild', чтобы не ловить ошибку transformWithEsbuild.
    minify: 'oxc',

    // CSS по умолчанию минифицируется через Lightning CSS.
    cssMinify: 'lightningcss',

    reportCompressedSize: true,

    // Не инлайним картинки/шрифты в base64.
    // Так ассеты лучше кешируются и не раздувают JS/CSS.
    assetsInlineLimit: 0,

    chunkSizeWarningLimit: 500,

    rolldownOptions: {
      output: {
        manualChunks,

        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? ''

          if (/\.(css)$/.test(name)) {
            return 'assets/css/[name]-[hash][extname]'
          }

          if (/\.(woff2?|ttf|otf|eot)$/.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          if (/\.(png|jpe?g|webp|avif|gif|svg)$/.test(name)) {
            return 'assets/images/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
}
