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
    <input v-model="taskTitle" @keyup.enter="_addTask" placeholder="New task" class="text-area" />
    <button @click="_addTask">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.38 15.38">
        <g>
          <polygon
            class="add-ico"
            points="12.31 6.15 9.23 6.15 9.23 3.08 9.23 0 6.15 0 6.15 3.08 6.15 6.15 3.08 6.15 0 6.15 0 9.23 3.08 9.23 6.15 9.23 6.15 12.31 6.15 15.38 9.23 15.38 9.23 12.31 9.23 9.23 12.31 9.23 15.38 9.23 15.38 6.15 12.31 6.15"
          />
        </g>
      </svg>
    </button>
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

.add-ico {
  fill: var(--color-background-task);
}
button:hover .add-ico {
  fill: var(--c-white);
}
@media (max-width: 1024px) {
  button:hover {
    background-color: var(--color-links);
    color: var(--color-background-task);
  }
  button:hover .add-ico[data-v-f9b56140] {
    fill: var(--color-background-task);
  }
}
</style>
