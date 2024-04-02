<script setup>
import { ref, nextTick } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const props = defineProps({
  task: Object
})

const tasksStore = useTasksStore()

const _removeTask = async () => {
  await tasksStore.deleteExistingTask(props.task.id)
}
const _completeTask = async () => {
  await tasksStore.markTaskComplete(props.task.id)
}

// Lógica de edición del título
const textAreaRef = ref(null)
const taskTitle = ref(props.task.title)
const isEditing = ref(false)

const _accessEditMode = () => {
  if (!isEditing.value) {
    isEditing.value = true
    textAreaRef.value.select()
    // Añadir el listener de clic fuera en el siguiente tick
    nextTick(() => {
      document.addEventListener('click', handleClickOutside, true)
    })
  }
}

// Función que llama a la función del store
const updateTaskTitle = async () => {
  if (taskTitle.value !== props.task.title && taskTitle.value.trim() !== '') {
    try {
      await tasksStore.changeTaskTitle(props.task.id, taskTitle.value.trim())
    } catch (error) {
      console.error('Error al actualizar la tarea', error)
    }
  }
  exitEditMode()
}

// Función que desactiva el modo de edición
const exitEditMode = () => {
  isEditing.value = false
  document.removeEventListener('click', handleClickOutside, true)
}

// Evento de key enter
const handleKeydown = (event) => {
  if (event.key === 'Enter' && isEditing.value) {
    event.preventDefault()
    updateTaskTitle()
  }
}

// Eventos de click fuera
const handleClickOutside = (event) => {
  if (isEditing.value && (!textAreaRef.value || !textAreaRef.value.contains(event.target))) {
    updateTaskTitle()
  }
}
</script>

<template>
  <li>
    <div class="task-content">
      <div class="checkbox-container" @click="_completeTask()">
        <input type="checkbox" :checked="task.is_complete" />
        <span class="checkmark"></span>
      </div>
      <div class="task-title" @click="_accessEditMode" :class="{ edit: isEditing }">
        <p role="textbox">{{ props.task.title }}</p>
        <textarea
          ref="textAreaRef"
          class="text-area"
          maxlength="512"
          spellcheck="false"
          style="height: 32px"
          v-model="taskTitle"
          @keydown="handleKeydown"
        ></textarea>
      </div>
      <!-- <p class="task-status">Completed: {{ props.task.is_complete ? 'Yes' : 'No' }}</p> -->
      <p>{{ props.task.id }}</p>
      <button @click="_removeTask">Delete</button>
    </div>
  </li>
</template>

<style scoped>
.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.task-title {
  flex: 1 1 25rem;
  position: relative;
}
.task-title p {
  font-size: 1rem;
  line-height: 20px;
  margin: 0;
  background-color: transparent;
  overflow: hidden;
  overflow-wrap: anywhere;
  white-space: normal;
  cursor: pointer;
  z-index: 0;
  padding-left: 13px;
}
.text-area {
  position: absolute;
  top: -6px;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
  text-transform: uppercase;
}

.task-title.edit p {
  cursor: pointer;
}

.task-title.edit .text-area {
  opacity: 1;
  z-index: 0;
  background-color: var(--c-white);
}
</style>
