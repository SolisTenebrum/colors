import { defineStore } from 'pinia'

export const useFilterModalStore = defineStore('filterModal', {
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
