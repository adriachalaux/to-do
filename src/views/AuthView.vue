<script setup></script>

<template>
  <section class="auth-wrapper">
    <RouterView />
  </section>
</template>

<style scoped>
.auth-wrapper {
  padding-top: 15vh;
  max-width: 80rem;
  margin: 0 auto;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .auth-wrapper {
    padding-top: 10vh;
  }
}
</style>
