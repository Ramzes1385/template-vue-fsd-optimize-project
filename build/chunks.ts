// build/chunks.ts
const vendorChunks: Record<string, string[]> = {
  vue: ['vue', 'vue-router', 'pinia'],
  i18n: ['vue-i18n'],
  http: ['axios'],
}

export function manualChunks(id: string) {
  if (!id.includes('node_modules')) {
    return
  }

  for (const [chunkName, packages] of Object.entries(vendorChunks)) {
    if (packages.some((packageName) => id.includes(`/node_modules/${packageName}/`))) {
      return chunkName
    }
  }

  return 'vendor'
}
