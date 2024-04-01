<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
// Components
import NewTaskComponent from '@/components/NewTaskComponent.vue'
import TaskItemComponent from '@/components/TaskItemComponent.vue'
import TaskItemCompletedComponent from '@/components/TaskItemCompletedComponent.vue'
import NoCompletedItemsComponent from '@/components/NoCompletedItemsComponent.vue'
import NoTaskItemsComponent from '@/components/NoTaskItemsComponent.vue'

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
    <NewTaskComponent />
    <div class="tasks__list tasks__list--pending" v-if="tasksStore.pendingTasks.length">
      <h3>Pending Tasks</h3>
      <ol>
        <TaskItemComponent v-for="task in tasksStore.pendingTasks" :key="task.id" :task="task" />
      </ol>
    </div>
    <NoTaskItemsComponent v-else />
    <div class="tasks__list tasks__list--completed" v-if="tasksStore.completedTasks.length">
      <h3>Completed Tasks</h3>
      <ol>
        <TaskItemCompletedComponent
          v-for="task in tasksStore.completedTasks"
          :key="task.id"
          :task="task"
        />
      </ol>
    </div>
    <NoCompletedItemsComponent v-else />
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
.tasks__list--pending {
  padding: 2rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
}
.tasks__list h3 {
  margin-bottom: 1rem;
}
</style>
