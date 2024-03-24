import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import router from './router'
import './assets/main.css'

// Crea la instancia de Pinia
const pinia = createPinia()
// Registra el plugin de persistencia en Pinia
pinia.use(piniaPersist)

// Crea la instancia de la aplicación Vue
const app = createApp(App)

// Registra Pinia y Vue Router en la instancia de la aplicación
app.use(pinia)
app.use(router)

// Monta la aplicación Vue
app.mount('#app')
