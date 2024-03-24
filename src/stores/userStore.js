import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, signOut } from '@/api/userApi'

export const useUserStore = defineStore({
  id: 'user', // Identificador único para el store
  // State
  state: () => ({
    user: undefined // Inicializa el estado del usuario como indefinido
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
        if (result.user) {
          this.user = result.user
        } else {
          // Iniciar sesión automáticamente al usuario después del registro
          await this.signIn(email, password)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async signIn(email, password) {
      try {
        this.user = await logIn(email, password)
      } catch (error) {
        console.error(error)
      }
    },
    async signOut() {
      try {
        await signOut() // Utiliza la función signOut de userApi.js
        this.user = null // Limpia el estado del usuario en el store
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message)
      }
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
