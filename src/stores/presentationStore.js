import { defineStore } from 'pinia'

export const usePresentationStore = defineStore('presentation', {
  state: () => ({
    showPresentation: true
  }),
  actions: {
    hidePresentation() {
      this.showPresentation = false
    }
  }
})
