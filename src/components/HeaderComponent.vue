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
        <button v-if="user" @click="_signOut">Logout</button>
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
</style>
