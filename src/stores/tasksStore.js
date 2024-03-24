// import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks } from '@/api/tasksApi'

export const useTasksStore = defineStore({
  // ID
  id: 'tasks',
  // State
  state: () => ({
    tasks: []
  }),
  // Getters
  getters: {
    // Añadir aquí
  },
  actions: {
    async fetchTasks() {
      try {
        this.tasks = await fetchAllTasks()
      } catch (error) {
        console.error('Error al cargar las tareas:', error.message)
      }
    }
  }
})
