<script setup>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <h2>Hola {{ user.email }}</h2>
  </main>
</template>

<style scoped></style>
