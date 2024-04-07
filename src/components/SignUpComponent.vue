<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const email = ref('')
const password = ref('')
const passwordRepeat = ref('')

const router = useRouter()

const _signUp = async (e) => {
  e.preventDefault()
  if (password.value !== passwordRepeat.value) {
    alert('Las contraseñas no coinciden.')
    return
  }
  try {
    await userStore.signUp(email.value, password.value)
    // Redirigir al usuario o mostrar mensaje de éxito
    alert('Usuario creado')
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section class="auth">
    <div class="auth__content">
      <h2 class="h-xxl">Register</h2>
      <p class="auth__content-subtitle">Please fill in this form to create an account</p>
      <form @submit.prevent="_signUp" class="auth__form">
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

          <label for="psw-repeat"><b>Repeat Password</b></label>
          <input
            type="password"
            placeholder="Repeat Password"
            v-model="passwordRepeat"
            id="psw-repeat"
            required
          />

          <button type="submit" class="registerbtn">Register</button>
        </div>

        <div class="container signin">
          <p>Already registered? <router-link to="/auth/login">Login</router-link></p>
        </div>
      </form>
    </div>
    <aside class="auth__image">
      <img src="../assets/img/ico-face.svg" alt="" />
    </aside>
  </section>
</template>

<style scoped>
.auth {
  display: flex;
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

@media (max-width: 1024px) {
  .auth__image {
    display: none;
  }
  .auth__content {
    flex: 1;
  }
}
</style>
