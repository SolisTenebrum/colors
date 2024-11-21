import { defineStore } from 'pinia'

export const useCartModalStore = defineStore('cartModal', {
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
