import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  actions: {
    async register(credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', credentials)
        this.setAuth(response.data.token, response.data.user)
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials)
        this.setAuth(response.data.token, await this.fetchUser())
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },

    logout() {
      this.clearAuth()
    },

    setAuth(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearAuth() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user
  }
})
