<script setup>
import { useTasksStore } from '@/stores/tasksStore'

const props = defineProps({
  task: Object
})

const tasksStore = useTasksStore()

const _removeTask = async () => {
  await tasksStore.deleteExistingTask(props.task.id)
}
const _incompleteTask = async () => {
  await tasksStore.markTaskInComplete(props.task.id)
}
</script>

<template>
  <li>
    <div class="task-content">
      <div class="checkbox-container" @click="_incompleteTask()">
        <input type="checkbox" :checked="task.is_complete" />
        <span class="checkmark"></span>
      </div>
      <p class="task-title">
        <span>{{ props.task.title }}</span>
      </p>
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
.task-content {
  display: flex;
  align-items: center;
  height: 2.5rem;
  gap: 1rem;
  color: var(--color-links);
}
.task-title {
  flex: 1 1 25rem;
  text-decoration: line-through;
  margin-right: 0.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
}
.checkbox-container:hover input:checked ~ .checkmark {
  background-color: var(--color-links-hover);
}
.ico-remove {
  fill: var(--color-background-task);
}
button:hover .ico-remove {
  fill: var(--c-white);
}
</style>
