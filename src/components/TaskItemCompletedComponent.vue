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
      <p class="task-status">Completed: {{ props.task.is_complete ? 'Yes' : 'No' }}</p>
      <p>{{ props.task.id }}</p>
      <button @click="_incompleteTask">Incomplete</button>
      <button @click="_removeTask">Delete</button>
    </div>
  </li>
</template>

<style scoped>
.task-content {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #737373;
}
.task-title {
  flex: 0 1 25rem;
  text-decoration: line-through;
}
.task-title span {
  font-weight: bold;
}
.task-status {
  flex: 0 1 35rem;
}
</style>
