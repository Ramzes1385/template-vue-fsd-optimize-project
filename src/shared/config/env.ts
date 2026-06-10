const getRequiredEnv = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key]

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`)
  }

  return value
}

export const env = {
  apiBaseUrl: getRequiredEnv('VITE_API_BASE_URL'),

  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
