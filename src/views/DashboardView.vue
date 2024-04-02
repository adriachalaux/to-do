<script setup>
import { onMounted } from 'vue'
// import { useUserStore } from '@/stores/userStore'
import { useTasksStore } from '@/stores/tasksStore'
// import { storeToRefs } from 'pinia'
// Components
import NewTaskComponent from '@/components/NewTaskComponent.vue'
import TaskItemComponent from '@/components/TaskItemComponent.vue'
import TaskItemCompletedComponent from '@/components/TaskItemCompletedComponent.vue'
import NoCompletedItemsComponent from '@/components/NoCompletedItemsComponent.vue'
import NoTaskItemsComponent from '@/components/NoTaskItemsComponent.vue'

// const userStore = useUserStore()
// const { user } = storeToRefs(userStore)

const tasksStore = useTasksStore()
onMounted(() => {
  tasksStore.fetchTasks()
})
</script>

<template>
  <div class="dashboard">
    <aside>
      <h2 class="p-m">Dashboard</h2>
      <h3 class="h-xl">{{ tasksStore.totalTasksCount }} tareas</h3>
      <h4 class="p-m">{{ tasksStore.pendingTasksCount }} pendientes</h4>
      <h4 class="p-m">{{ tasksStore.completedTasksCount }} completas</h4>
    </aside>
    <main>
      <div class="dashboard__tasks">
        <h2 class="p-m">Tasks</h2>
        <NewTaskComponent class="dashboard__new-task" />
        <div class="tasks__list tasks__list--pending" v-if="tasksStore.pendingTasks.length">
          <h3 class="h-xxl">Pending</h3>
          <ul>
            <TaskItemComponent
              v-for="task in tasksStore.pendingTasks"
              :key="task.id"
              :task="task"
            />
          </ul>
        </div>
        <NoTaskItemsComponent v-else />
        <div class="tasks__list tasks__list--completed" v-if="tasksStore.completedTasks.length">
          <h3 class="h-xxl">Completed</h3>
          <ul>
            <TaskItemCompletedComponent
              v-for="task in tasksStore.completedTasks"
              :key="task.id"
              :task="task"
            />
          </ul>
        </div>
        <NoCompletedItemsComponent v-else />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  padding-top: 5rem;
  padding-bottom: 10rem;
}
@media (min-width: 1024px) {
  .dashboard {
    display: flex;
  }
}

aside {
  flex: 0 1 18rem;
  padding: 1rem;
  /* position: sticky;
  top: 5rem; */
}
main {
  flex: 1;
  padding: 1rem;
}
.dashboard__tasks {
  max-width: 60rem;
  margin: 0 auto;
}
.dashboard__new-task {
  margin-top: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
