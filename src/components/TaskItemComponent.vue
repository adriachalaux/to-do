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
          v-model="taskTitle"
          @keydown="handleKeydown"
        ></textarea>
      </div>
      <!-- <p class="task-status">Completed: {{ props.task.is_complete ? 'Yes' : 'No' }}</p> -->
      <!-- <p>{{ props.task.id }}</p> -->
      <button @click="_removeTask">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.47 14.47">
          <g>
            <polygon
              class="ico-remove"
              points="11.58 9.41 9.41 7.23 11.58 5.06 14.47 2.18 12.29 0 9.41 2.88 7.23 5.06 5.06 2.88 2.18 0 0 2.18 2.88 5.06 5.06 7.23 2.88 9.41 0 12.29 2.18 14.47 5.06 11.58 7.23 9.41 9.41 11.58 12.29 14.47 14.47 12.29 11.58 9.41"
            />
          </g>
        </svg>
      </button>
    </div>
  </li>
</template>

<style scoped>
button {
  font-weight: 900;
}
.task-content {
  display: flex;
  align-items: center;
  height: 2.5rem;
  gap: 0.25rem;
  /* margin-bottom: 0.5rem; */
}
.task-title {
  flex: 1 1 25rem;
  position: relative;
  height: 2.25rem;
  display: flex;
  align-items: center;
  transition: all 0.8s ease;
}
.task-title p {
  line-height: 20px;
  margin: 0;
  background-color: transparent;
  overflow: hidden;
  overflow-wrap: anywhere;
  white-space: normal;
  cursor: pointer;
  z-index: 0;
  padding-left: 0.75rem;
}
.text-area {
  position: absolute;
  height: 2.25rem;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
  text-transform: uppercase;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
}

.task-title:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-links-hover);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left center;
  transition: all 0.8s ease;
}

.task-content:hover .task-title {
  color: var(--c-white);
  transition: all 0.3s ease;
}

.task-content:hover .task-title:after {
  transform: scaleX(1);
  transition: all 0.3s ease;
}

.task-title.edit p {
  cursor: pointer;
}

.task-title.edit .text-area {
  opacity: 1;
  z-index: 0;
  background-color: var(--c-white);
}

.task-content:hover .checkbox-container .checkmark:after {
  content: '';
  position: absolute;
  display: block;
  left: 1rem;
  top: 0.5rem;
  width: 0.4rem;
  height: 1rem;
  border: solid var(--c-white);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.checkbox-container:hover .checkmark {
  background-color: var(--color-links-hover);
}
.ico-remove {
  fill: var(--color-background-task);
}
button:hover .ico-remove {
  fill: var(--c-white);
}
</style>
