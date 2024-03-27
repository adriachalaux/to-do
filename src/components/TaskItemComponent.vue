<script setup>
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
</script>

<template>
  <li>
    <div class="task-content">
      <p class="task-title">
        Title: <span>{{ props.task.title }}</span>
      </p>
      <p class="task-status">Completed: {{ props.task.is_complete ? 'Yes' : 'No' }}</p>
      <p>{{ props.task.id }}</p>
      <button @click="_completeTask">Complete</button>
      <button @click="_removeTask">Delete</button>
    </div>
  </li>
</template>

<style scoped>
.task-content {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.task-title {
  flex: 0 1 25rem;
}
.task-title span {
  font-weight: bold;
}
.task-status {
  flex: 0 1 35rem;
}
</style>
