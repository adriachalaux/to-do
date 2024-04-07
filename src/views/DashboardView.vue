<script setup>
import { onMounted, watchEffect, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
// Components
import NewTaskComponent from '@/components/NewTaskComponent.vue'
import TaskItemComponent from '@/components/TaskItemComponent.vue'
import TaskItemCompletedComponent from '@/components/TaskItemCompletedComponent.vue'
import NoCompletedItemsComponent from '@/components/NoCompletedItemsComponent.vue'
import NoTaskItemsComponent from '@/components/NoTaskItemsComponent.vue'
import MessagesComponent from '@/components/MessagesComponent.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'

const isLoading = ref(true)

const tasksStore = useTasksStore()
onMounted(async () => {
  // await tasksStore.fetchTasks()
  // isLoading.value = false
  await Promise.all([
    tasksStore.fetchTasks(),
    new Promise((resolve) => setTimeout(resolve, 1000)) // Añadir 1 segundo falso
  ])
  isLoading.value = false
})

watchEffect(() => {
  const count = tasksStore.pendingTasksCount
  const maxCount = 10

  // Si hay tareas pendientes, calcula el valor de --color-count. De lo contrario, usa un valor predeterminado
  if (count > 0) {
    const colorCount = calculateColorCount(count, maxCount)
    document.documentElement.style.setProperty('--color-count', colorCount.toString())
    document.documentElement.style.setProperty(
      '--color-background-task',
      `hsl(var(--color-count), 100%, 68%)`
    )
  } else {
    // No hay tareas pendientes, establece valores predeterminados
    document.documentElement.style.setProperty('--color-background-task', 'var(--c-grey)')
  }

  // Actualizar el color de fondo del body según si hay tareas pendientes o no
  const backgroundColor = count > 0 ? 'var(--color-background-task)' : 'var(--color-background)'
  document.body.style.backgroundColor = backgroundColor
})

function calculateColorCount(count, maxCount) {
  // Asegurar de que count no sea mayor que maxCount
  const normalizedCount = Math.min(count, maxCount)

  // Calcular el valor de --color-count. 184 es el valor del azul inicial.
  const colorCount = 184 - (normalizedCount / maxCount) * 184
  return colorCount
}
</script>

<template>
  <LoaderComponent v-if="isLoading" />
  <div class="dashboard" v-if="!isLoading">
    <aside>
      <div class="aside__content">
        <div class="aside__content--top">
          <h3 class="h-xl">{{ tasksStore.totalTasksCount }} tasks</h3>
          <h4 class="h-l">{{ tasksStore.pendingTasksCount }} pending</h4>
          <h4 class="h-l">{{ tasksStore.completedTasksCount }} completed</h4>
        </div>
        <div class="aside__content--center">
          <MessagesComponent />
        </div>
        <div class="aside__content--bottom">
          <NewTaskComponent class="dashboard__new-task" />
        </div>
      </div>
    </aside>
    <main>
      <div class="dashboard__tasks">
        <!-- Lista de Tareas Pendientes -->
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

        <!-- Mostrar NoTaskItemsComponent si NO hay tareas pendientes -->
        <NoTaskItemsComponent v-else-if="!tasksStore.pendingTasks.length" />

        <!-- Lista de Tareas Completadas -->
        <!-- Esta sección siempre se muestra si hay tareas completadas, sin importar si NoTaskItemsComponent se muestra -->
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

        <!-- No hay tareas completadas y hay tareas pendientes -->
        <NoCompletedItemsComponent
          v-if="!tasksStore.completedTasks.length && tasksStore.pendingTasks.length"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  padding-top: 5rem;
  padding-bottom: 10rem;
}

aside {
  padding: 1rem;
}

main {
  flex: 1;
  padding: 1rem;
}

.dashboard__tasks {
  max-width: 55rem;
  margin: 0 auto;
}

.dashboard__new-task {
  margin-top: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
}

ol {
  margin-bottom: 2rem;
  margin-left: 0;
  padding-inline-start: 1.5rem;
}

.tasks__list--pending {
  padding: 2rem 0;
  margin-bottom: 2.5rem;
}

.tasks__list--completed h3 {
  text-align: right;
}

.tasks__list h3 {
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  main {
    margin-left: 25rem;
  }
  .dashboard {
    display: flex;
    align-items: flex-start;
  }
  aside {
    position: fixed;
    top: 5rem;
    width: 25rem;
  }
  .aside__content {
    height: calc(100vh - 7.5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
