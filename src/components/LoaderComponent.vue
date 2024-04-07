<script setup></script>

<template>
  <div class="loading__content">
    <h2 class="h-xxl">Loading<span>.</span><span>.</span><span>.</span></h2>
  </div>
</template>

<style scoped>
.loading__content {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@keyframes hideDots {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
}
@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.h-xxl span {
  animation: blink 1.4s infinite both;
}

.h-xxl span:nth-child(1) {
  animation-delay: 0s;
}

.h-xxl span:nth-child(2) {
  animation-delay: 0.4s;
}

.h-xxl span:nth-child(3) {
  animation-delay: 0.8s;
}
</style>
