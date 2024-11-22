import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    modals: {
      burgerModal: false,
      filterModal: false,
      cartModal: false,
    },
  }),
  actions: {
    openModal(modalName) {
      if (Object.prototype.hasOwnProperty.call(this.modals, modalName)) {
        this.modals[modalName] = true
      }
    },
    closeModal(modalName) {
      if (Object.prototype.hasOwnProperty.call(this.modals, modalName)) {
        this.modals[modalName] = false
      }
    },
  },
})
