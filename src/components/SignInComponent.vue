<script setup>
import { ref } from 'vue'
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
</script>

<template>
  <main>
    <h1>Login</h1>
    <p>Please fill in this form to create an account.</p>
    <hr />
    <form @submit.prevent="_signIn">
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
        <input type="password" placeholder="Enter Password" v-model="password" id="psw" required />
        <hr />

        <button type="submit" class="registerbtn">Login</button>
      </div>

      <div class="container signin">
        <p>¿No tienes cuenta? <router-link to="/auth/signup">Registrarse</router-link></p>
      </div>
    </form>
  </main>
</template>

<style scoped>
/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type='text']:focus,
input[type='password']:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #04aa6d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
