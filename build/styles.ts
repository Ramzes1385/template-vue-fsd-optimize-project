import type { UserConfig } from 'vite'

export const cssConfig = {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @use "@shared/styles/tokens" as *;
        @use "@shared/styles/mixins" as *;
      `,
    },
  },
} satisfies UserConfig['css']
