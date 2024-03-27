<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
// Components
import NewTaskComponent from '@/components/NewTaskComponent.vue'
import TaskItemComponent from '@/components/TaskItemComponent.vue' // Asegúrate de que la ruta de importación sea correcta

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
    <h3>Tienes {{ tasksStore.totalTasksCount }} tareas</h3>
    <h4>
      {{ tasksStore.completedTasksCount }} completas y {{ tasksStore.pendingTasksCount }} pendientes
    </h4>
    <ol>
      <TaskItemComponent v-for="task in tasksStore.tasksSortedById" :key="task.id" :task="task" />
    </ol>
    <NewTaskComponent />
  </main>
</template>

<style scoped>
h4 {
  margin-bottom: 1rem;
}
ol {
  margin-bottom: 2rem;
  margin-left: 0;
  padding-inline-start: 1.5rem;
}
</style>
