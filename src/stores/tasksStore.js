// import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks, addTask, updateTask, deleteTask } from '@/api/tasksApi'

// Llamada ponzoña al otro store de usuario para el id
import { useUserStore } from './userStore'

export const useTasksStore = defineStore({
  // ID
  id: 'tasks',
  // State
  state: () => ({
    tasks: []
  }),
  // Getters
  getters: {
    // Tareas ordenadas por ID
    tasksSortedById(state) {
      return [...state.tasks].sort((a, b) => a.id - b.id)
    },
    // Número total de tareas
    totalTasksCount(state) {
      return state.tasks.length
    },
    // Tareas completadas
    completedTasks(state) {
      return state.tasks.filter((task) => task.is_complete)
    },
    // Número de tareas completadas
    completedTasksCount() {
      return this.completedTasks.length
    },
    // Tareas pendientes
    pendingTasks(state) {
      return state.tasks.filter((task) => !task.is_complete)
    },
    // Número de tareas pendientes
    pendingTasksCount() {
      return this.pendingTasks.length
    }
  },
  actions: {
    async fetchTasks() {
      try {
        this.tasks = await fetchAllTasks()
      } catch (error) {
        console.error('Error al cargar las tareas:', error.message)
      }
    },
    async addNewTask(title) {
      const userStore = useUserStore() // Acceso al store
      try {
        const newTask = await addTask(title, userStore.user.id)
        this.tasks.push(newTask)
      } catch (error) {
        console.error('Error al añadir tarea:', error.message)
      }
    },
    async markTaskComplete(taskId) {
      try {
        await updateTask(taskId, { is_complete: true })
        // Actualizar el estado local de la tarea a completada
        const task = this.tasks.find((task) => task.id === taskId)
        if (task) task.is_complete = true
      } catch (error) {
        console.error('Error al actualizar tarea:', error.message)
      }
    },
    async deleteExistingTask(taskId) {
      try {
        await deleteTask(taskId)
        // Eliminar la tarea del estado local
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      } catch (error) {
        console.error('Error al borrar tarea:', error.message)
      }
    }
  }
})
