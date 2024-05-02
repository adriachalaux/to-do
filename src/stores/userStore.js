import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, signOut } from '@/api/userApi'

export const useUserStore = defineStore({
  id: 'user', // Identificador único para el store
  // State
  state: () => ({
    user: undefined, // Inicializa el estado del usuario como indefinido
    message: '', // Mensaje para mostrar al usuario
    messageType: 'info' // 'info', 'error', o 'success'
  }),
  // Getters

  // Actions
  actions: {
    async fetchUser() {
      try {
        this.user = await fetchActualUser()
      } catch (error) {
        if (error.code === '401') {
          this.user = null
          return
        }
        console.error(error)
      }
    },
    async signUp(email, password) {
      try {
        const result = await createNewUser(email, password)
        if (result.error) {
          this.message = result.error.message
          this.messageType = 'error'
        } else {
          this.user = result.user
          this.message = 'Registration successful!'
          this.messageType = 'success'
          // Iniciar sesión automáticamente al usuario después del registro
          await this.signIn(email, password)
        }
      } catch (error) {
        // Maneja errores no capturados de la API
        this.message = error.message || 'An unexpected error occurred during sign up.'
        this.messageType = 'error'
      }
    },
    async signIn(email, password) {
      try {
        const user = await logIn(email, password)
        this.user = user
        this.message = 'Logged in successfully.'
        this.messageType = 'success'
      } catch (error) {
        this.message = error.message
        this.messageType = 'error'
      }
    },
    async signOut() {
      try {
        await signOut()
        this.user = null
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message)
      }
    },
    clearMessages() {
      this.message = ''
      this.messageType = 'info'
    }
  },

  // Habilita la persistencia para este store
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user', // La clave bajo la cual se almacenará el estado persistido
        storage: window.localStorage // Usa localStorage como medio de almacenamiento
      }
    ]
  }
})
