<script setup>
document.body.style.backgroundColor = 'var(--color-background)'
import { usePresentationStore } from '@/stores/presentationStore'
const presentationStore = usePresentationStore()
</script>

<template>
  <div v-if="presentationStore.showPresentation" class="presentation">
    <div class="presentation__header">
      <img src="../assets/img/tick-task-logo.svg" alt="" />
    </div>
    <div class="presentation__intro presentation-space">
      <img src="../assets/img/ico-time.svg" alt="" />
      <h2 class="h-xl">Administrando el Tiempo con Eficacia</h2>
    </div>
    <div class="presentation__item">
      <h3 class="h-xxl">Naming</h3>
      <p class="p-m">
        El nombre "TickTask" encapsula dos conceptos clave. El primero es el sonido
        <span>"tic-tac"</span>, representando el paso constante del tiempo, algo esencial en la
        gestión de tareas. El segundo es una alusión al <span>"tick"</span>, sugiriendo la acción de
        completar tareas y motivando a la productividad.
      </p>
    </div>
    <div class="presentation__item">
      <h3 class="h-xxl">Tech Stack</h3>

      <p class="p-m">
        <span>Vue.js</span> facilita una experiencia de usuario reactiva y dinámica.
      </p>
      <p class="p-m"><span>Vite</span> ofrece una rápida configuración y tiempo de recarga.</p>
      <p class="p-m">
        <span>Supabase</span> proporciona una gestión de base de datos robusta y en tiempo real
      </p>
      <p class="p-m"><span>Pinia</span> maneja el estado de la aplicación de manera eficaz.</p>
    </div>
    <div class="presentation__item">
      <h3 class="h-xxl">Challenges</h3>
      <p class="p-m">
        Implementar autenticación, manejar estados complejos y sincronizar la base de datos en
        tiempo real fueron desafíos significativos. La integración de estos elementos requería un
        diseño cuidadoso para asegurar que la aplicación fuera tanto segura como eficiente.
      </p>
    </div>
    <div class="presentation__item">
      <h3 class="h-xxl">Specials</h3>
      <p class="p-m">
        <span>Mensajes de Motivación:</span> Cada vez que se crea, edita o completa una tarea,
        TickTask presenta mensajes motivacionales que no solo inspiran sino que también mejoran la
        satisfacción del usuario.
      </p>
      <p class="p-m">
        <span>Edición Dinámica:</span> Las tareas pueden ser editadas en tiempo real directamente en
        la página de la lista, sin necesidad de navegación adicional o recargas de página, gracias a
        Vue.js y su reactividad así como implementaciones creativas de CSS y JavaScript.
      </p>
      <p class="p-m">
        <span>Organización de Tareas:</span> Las tareas están claramente separadas en categorías de
        completadas y no completadas, permitiendo a los usuarios organizar su carga de trabajo más
        eficientemente.
      </p>
      <p class="p-m">
        <span>Microanimaciones:</span> Las transiciones y animaciones sutiles mejoran
        significativamente la experiencia del usuario, haciendo la interacción más intuitiva y
        visualmente gratificante.
      </p>
    </div>
    <a href="#" class="btn-discover h-xl" @click="presentationStore.hidePresentation"
      >Entrar a TickTask</a
    >
  </div>

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
    padding-top: 2rem;
  }
}

/* PRESENTATION */
.presentation {
  width: 100vw;
  min-height: 100vh;
  background-color: var(--c-grey);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.presentation-space {
  padding: 5rem 0;
}
.presentation__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.presentation__intro img {
  max-width: 5rem;
}
.presentation__item {
  background-color: var(--c-white);
  padding: 5rem 4rem 3rem 4rem;
  max-width: 60rem;
  margin: 5rem auto;
}
.presentation__item h3 {
  margin-bottom: 3rem;
}
.presentation__item p {
  margin-bottom: 1rem;
}
.presentation__item span {
  color: var(--c-white);
  background-color: var(--c-black);
}
.btn-discover {
  background-color: var(--c-white);
  color: var(--c-black);
  max-width: 60rem;
  margin: 5rem auto 15rem auto;
  padding: 1.5rem 1rem 2rem 1rem;
  display: block;
  text-align: center;
}
.btn-discover:hover {
  background-color: var(--c-black);
  color: var(--c-white);
}
</style>
