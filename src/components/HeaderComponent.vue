<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const router = useRouter()

function _signOut() {
  userStore.signOut()
  router.push('/auth')
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink v-if="!user" to="/auth">Auth</RouterLink>
        <div v-if="user" class="navigation--user">
          <h4>Hola {{ user.email }}</h4>
          <button @click="_signOut">Logout</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #eeeeee;
  width: 100%;
  padding: 1rem;
}
nav {
  display: flex;
  justify-content: space-between;
}
.navigation--user {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
