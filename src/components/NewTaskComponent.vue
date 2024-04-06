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
    <input
      v-model="taskTitle"
      @keyup.enter="_addTask"
      placeholder="Nueva Tarea"
      class="text-area"
    />
    <button @click="_addTask">+</button>
  </div>
</template>

<style scoped>
.text-area {
  width: 100%;
  background-color: var(--color-links);
  color: var(--c-white);
}
.text-area::-webkit-input-placeholder {
  color: var(--color-background-task);
}

.text-area:active,
.text-area:focus,
.text-area:focus-visible {
  background-color: var(--c-white);
  color: var(--c-black);
}

.text-area:focus-visible::-webkit-input-placeholder {
  color: var(--c-grey);
}
</style>
