<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const tasksStore = useTasksStore()
onMounted(() => {
  tasksStore.fetchTasks()
})
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <h2>Hola {{ user.email }}</h2>
    <ul>
      <li v-for="task in tasksStore.tasks" :key="task.id">
        Title: {{ task.title }} - Completed {{ task.is_complete }}
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
