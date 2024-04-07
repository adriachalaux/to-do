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
    tasks: [],
    tasksAdded: 0,
    tasksCompletedConsecutively: 0,
    lastActionWasComplete: false
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
      return state.tasks
        .filter((task) => task.is_complete)
        .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
    },
    // Número de tareas completadas
    completedTasksCount() {
      return this.completedTasks.length
    },
    // Tareas pendientes
    pendingTasks(state) {
      return state.tasks.filter((task) => !task.is_complete).sort((a, b) => b.id - a.id)
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
        this.tasksAdded += 1
        this.lastActionWasComplete = false
      } catch (error) {
        console.error('Error al añadir tarea:', error.message)
      }
    },
    async markTaskComplete(taskId) {
      try {
        const now = new Date().toISOString()
        await updateTask(taskId, { is_complete: true, completed_at: now })
        // Actualizar el estado local de la tarea a completada
        const task = this.tasks.find((task) => task.id === taskId)
        if (task) {
          task.is_complete = true
          task.completed_at = now
        }
        if (this.lastActionWasComplete) {
          this.tasksCompletedConsecutively += 1
        } else {
          this.tasksCompletedConsecutively = 1 // Primera tarea completada consecutivamente
          this.lastActionWasComplete = true
        }
      } catch (error) {
        console.error('Error al actualizar tarea:', error.message)
      }
    },
    async markTaskInComplete(taskId) {
      try {
        await updateTask(taskId, { is_complete: false })
        // Actualizar el estado local de la tarea a completada
        const task = this.tasks.find((task) => task.id === taskId)
        if (task) task.is_complete = false
        this.tasksCompletedConsecutively = 0
        this.lastActionWasComplete = false
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
    },
    async changeTaskTitle(taskId, newTitle) {
      try {
        await updateTask(taskId, { title: newTitle })
        // Actualizar el estado local de la tarea a completada
        const task = this.tasks.find((task) => task.id === taskId)
        if (task) task.title = newTitle
      } catch (error) {
        console.error('Error al actualizar tarea:', error.message)
      }
    }
  }
})
