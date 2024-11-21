import { defineStore } from 'pinia'

export const useBurgerModalStore = defineStore('burgerModal', {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
  },
})
