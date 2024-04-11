<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const email = ref('')
const password = ref('')

const router = useRouter()

const _signIn = async (e) => {
  e.preventDefault()
  try {
    await userStore.signIn(email.value, password.value)
    // Redirigir al usuario o mostrar mensaje de éxito
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}

// Borrar mensajes al volver a cargar la vista
onMounted(() => {
  userStore.clearMessages()
})
</script>

<template>
  <section class="auth">
    <div class="auth__content">
      <h2 class="h-xxl">Login</h2>
      <p class="auth__content-subtitle">Please fill in this form to enter</p>

      <form @submit.prevent="_signIn" class="auth__form">
        <div class="container">
          <label for="email"><b>Email</b></label>
          <input
            type="text"
            placeholder="Enter Email"
            v-model="email"
            id="email"
            autocomplete="on"
            required
          />

          <label for="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            v-model="password"
            id="psw"
            required
          />

          <button type="submit" class="registerbtn">Login</button>
        </div>

        <div
          v-if="userStore.message"
          :class="{
            'message-success': userStore.messageType === 'success',
            'message-error': userStore.messageType === 'error'
          }"
        >
          {{ userStore.message }}
        </div>

        <div class="container signin">
          <p>No account? <router-link to="/auth/signup">Register</router-link></p>
        </div>
      </form>
    </div>
    <aside class="auth__image">
      <img src="../assets/img/ico-eye.svg" alt="" />
    </aside>
  </section>
</template>

<style scoped>
.auth {
  display: flex;
  gap: 4rem;
  width: 100%;
}
.auth__content,
.auth__image {
  flex: 0 1 50%;
  padding: 1rem;
}

.auth__image {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.auth__image img {
  max-width: 35rem;
  height: 100%;
}

.auth__content p {
  text-align: right;
}

.message-success {
  color: green;
}

.message-error {
  color: red;
}

@media (max-width: 1024px) {
  .auth__image {
    display: none;
  }
  .auth__content {
    flex: 1;
  }
}
</style>
