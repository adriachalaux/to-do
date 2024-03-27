<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const taskTitle = ref('')
const tasksStore = useTasksStore()

const _addTask = async () => {
  // Eliminar espacios en blanco al principio y al final
  const trimmedTitle = taskTitle.value.trim()

  // Verificar que el título tenga al menos 4 caracteres / si no salta error de Supabase
  if (trimmedTitle.length >= 4) {
    await tasksStore.addNewTask(trimmedTitle)
    taskTitle.value = '' // Limpiar el input después de añadir la tarea
  } else {
    console.log('El título debe ser superior a 4 carácteres')
  }
}
</script>

<template>
  <div>
    <input v-model="taskTitle" @keyup.enter="_addTask" placeholder="Nueva Tarea" />
    <button @click="_addTask">Añadir Tarea</button>
  </div>
</template>

<style scoped></style>
