// build/server/headers.ts
export const devHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

export const previewHeaders = {
  ...devHeaders,
  'Cache-Control': 'no-store',
}
