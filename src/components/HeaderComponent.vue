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
  <header class="header">
    <div class="header__logo">
      <img src="../assets/img/tt-logo.svg" alt="" />
    </div>
    <nav class="header__navigation">
      <!-- <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink v-if="!user" to="/auth">Auth</RouterLink> -->
      <div v-if="user" class="header__user">
        <h4 class="p-m">{{ user.email }}</h4>
        <button @click="_signOut">Logout</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
}
.header__logo {
  max-width: 3rem;
  flex: 0 1 8rem;
}
.header__navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}
.header__user {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 1024px) {
  .header {
    position: relative;
  }
  .header__user h4 {
    display: none;
  }
}
</style>
