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
      <button @click="_removeTask">X</button>
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
</style>
