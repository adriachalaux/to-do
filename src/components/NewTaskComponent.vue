<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const taskTitle = ref('')
const tasksStore = useTasksStore()

const _addTask = async () => {
  if (taskTitle.value.trim()) {
    await tasksStore.addNewTask(taskTitle.value)
    taskTitle.value = '' // Limpiar el input después de añadir la tarea
  }
}
</script>

<template>
  <div>
    <input v-model="taskTitle" placeholder="Nueva Tarea" />
    <button @click="_addTask">Añadir Tarea</button>
  </div>
</template>

<style scoped></style>
