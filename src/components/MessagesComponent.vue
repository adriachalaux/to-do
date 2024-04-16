<script setup>
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()
const imagesDirectory = 'src/assets/img/'

const message = computed(() => {
  if (tasksStore.tasksAdded === 5) return "You're on a roll, five tasks added!"
  if (tasksStore.tasksCompleted === 1) return "You've completed your first task"
  if (tasksStore.tasksCompletedConsecutively === 3) return '3 tasks down in a row!'
  if (tasksStore.tasksCompletedConsecutively === 5)
    return 'Incredible, 5 tasks completed back-to-back!'
  if (tasksStore.pendingTasksCount === 5) return 'You have 5 tasks on your list waiting for you!'
  if (tasksStore.pendingTasksCount === 10) return 'You have 10 tasks pending! Time to get moving!'
  if (tasksStore.totalTasksCount === 0) return 'Start adding your first task!'
  if (tasksStore.tasksAdded === 1) return "You've added a task!"
  return '' // Mensaje predeterminado
})

const imagePath = computed(() => {
  if (tasksStore.tasksAdded === 5) return `${imagesDirectory}ico-added-5.svg`
  if (tasksStore.tasksCompleted === 1) return `${imagesDirectory}ico-completed-first.svg`
  if (tasksStore.tasksCompletedConsecutively === 3) return `${imagesDirectory}ico-completed-3.svg`
  if (tasksStore.tasksCompletedConsecutively === 5) return `${imagesDirectory}ico-completed-5.svg`
  if (tasksStore.pendingTasksCount === 5) return `${imagesDirectory}ico-pending-5.svg`
  if (tasksStore.pendingTasksCount === 10) return `${imagesDirectory}ico-pending-10.svg`
  if (tasksStore.totalTasksCount === 0) return `${imagesDirectory}ico-start-adding.svg`
  if (tasksStore.tasksAdded === 1) return `${imagesDirectory}ico-added-first.svg`
  return '' // Imagen predeterminada
})
</script>

<template>
  <div class="messages__content" v-if="message">
    <img :src="imagePath" alt="" />
    <h4 class="h-l">{{ message }}</h4>
  </div>
</template>

<style scoped>
.messages__content img {
  max-width: 5rem;
  width: 100%;
  margin-bottom: 1rem;
}
@media (max-width: 1024px) {
  .messages__content {
    display: none;
  }
}
</style>
