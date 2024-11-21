import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    togglePreDelete(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.predeleted = !existingProduct.predeleted
      }
    },
    clearCart() {
      this.cart = []
    },
    increment(product) {
      this.cart.find((item) => item.id === product.id).quantity++
    },
    decrement(product) {
      this.cart.find((item) => item.id === product.id).quantity--
    },
  },
  getters: {
    getTotalPrice: (state) =>
      state.cart
        .filter((item) => !item.predeleted)
        .reduce((acc, item) => acc + item.price * item.quantity, 0),
    getCartLength: (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0),
  },
})
