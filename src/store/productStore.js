import axios from 'axios'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    originalProducts: [],
    products: [],
    filters: {
      isNew: false,
      inStock: false,
      isContract: false,
      isExclusive: false,
      isSale: false,
    },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true
      this.error = null

      try {
        const response = await axios.get('https://673fde87d0b59228b7ee01cf.mockapi.io/products')
        this.products = response.data
        this.originalProducts = response.data
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    sortExpensiveFirst() {
      this.products.sort((a, b) => b.price - a.price)
    },
    sortCheapFirst() {
      this.products.sort((a, b) => a.price - b.price)
    },
    sortNewFirst() {
      this.products.sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    sortPopularFirst() {
      this.products.sort((a, b) => b.isPopular - a.isPopular)
    },
    filterNew() {
      this.filters.isNew = !this.filters.isNew
      this.applyFilters()
    },
    filterInStock() {
      this.filters.inStock = !this.filters.inStock
      this.applyFilters()
    },
    filterContract() {
      this.filters.isContract = !this.filters.isContract
      this.applyFilters()
    },
    filterExclusive() {
      this.filters.isExclusive = !this.filters.isExclusive
      this.applyFilters()
    },
    filterSale() {
      this.filters.isSale = !this.filters.isSale
      this.applyFilters()
    },

    applyFilters() {
      let filteredProducts = [...this.originalProducts]

      if (this.filters.isNew) {
        filteredProducts = filteredProducts.filter((product) => product.isNew === true)
      }

      if (this.filters.inStock) {
        filteredProducts = filteredProducts.filter((product) => product.inStock === true)
      }

      if (this.filters.isContract) {
        filteredProducts = filteredProducts.filter((product) => product.isContract === true)
      }

      if (this.filters.isExclusive) {
        filteredProducts = filteredProducts.filter((product) => product.isExclusive === true)
      }

      if (this.filters.isSale) {
        filteredProducts = filteredProducts.filter((product) => product.isSale === true)
      }

      this.products = filteredProducts
    },
  },
})
