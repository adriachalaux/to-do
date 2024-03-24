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
  <main>
    <h2>Registrarse</h2>
    <p>Please fill in this form to create an account.</p>
    <hr />
    <form @submit.prevent="_signUp">
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

        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input
          type="password"
          placeholder="Repeat Password"
          v-model="passwordRepeat"
          id="psw-repeat"
          required
        />
        <hr />

        <button type="submit" class="registerbtn">Register</button>
      </div>

      <div class="container signin">
        <p>¿Ya estás registrado? <router-link to="/auth/login">Acceder</router-link></p>
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
