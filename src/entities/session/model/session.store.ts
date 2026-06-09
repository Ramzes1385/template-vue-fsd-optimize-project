import { defineStore } from 'pinia'
import type { SessionState } from './session.types'

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    accessToken: null,
  }),

  actions: {
    setAccessToken(token: string | null) {
      this.accessToken = token
    },

    clearSession() {
      this.accessToken = null
    },
  },
})
