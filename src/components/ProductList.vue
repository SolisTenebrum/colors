<script setup>
import ProductCard from './ProductCard.vue'
import { ref } from 'vue'
import { useProductStore } from '@/store/productStore'
import { useFilterModalStore } from '@/store/filterModalStore'
import { filterButtons, sortButtons } from '@/constants'

const productStore = useProductStore()
const filterModalStore = useFilterModalStore()

const filterStates = ref(filterButtons)
const sortStates = ref(sortButtons)
const isSortOpen = ref(false)
const sortMainText = ref('Сначала дорогие')

const toggleFilters = (filterId) => {
  const filter = filterStates.value.find((filter) => filter.id === filterId)
  if (filter) {
    filter.isActive = !filter.isActive
  }

  switch (filterId) {
    case 1:
      productStore.filterNew()
      break
    case 2:
      productStore.filterInStock()
      break
    case 3:
      productStore.filterContract()
      break
    case 4:
      productStore.filterExclusive()
      break
    case 5:
      productStore.filterSale()
      break

    default:
      break
  }
}

const openSortFilter = () => {
  isSortOpen.value = !isSortOpen.value
  document.body.style.overflow = 'hidden'
}

const closeSortFilter = () => {
  isSortOpen.value = false
  document.body.style.overflow = 'auto'
}

const selectSort = (sortId, sortText) => {
  const sort = sortStates.value.find((sort) => sort.id === sortId)
  if (sort) {
    sort.isActive = true
    sortMainText.value = sortText
    closeSortFilter()
  }

  switch (sortId) {
    case 1:
      productStore.sortExpensiveFirst()
      break
    case 2:
      productStore.sortCheapFirst()
      break
    case 3:
      productStore.sortPopularFirst()
      break
    case 4:
      productStore.sortNewFirst()
      break
  }
}

const openFilterModal = () => {
  filterModalStore.openModal()
  document.body.style.overflow = 'hidden'
}

const closeFilterModal = () => {
  filterModalStore.closeModal()
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <section class="product-list">
    <div
      class="product-list__overlay"
      :class="{ active: isSortOpen || filterModalStore.isModalOpen }"
    ></div>
    <div class="product-list__container">
      <h1 class="product-list__title">Краски</h1>
      <div class="product-list__filter">
        <div
          class="product-list__filter-button-container"
          v-for="filter in filterStates"
          @click="toggleFilters(filter.id)"
          :key="filter"
        >
          <div class="product-list__filter-icon" :class="{ active: filter.isActive }"></div>
          <p class="product-list__filter-text">{{ filter.name }}</p>
        </div>
      </div>
      <div class="product-list__content">
        <div class="product-list__top">
          <p class="product-list__quantity">{{ productStore.products.length }} товаров</p>
          <p class="product-list__filter-mobile-button" @click="openFilterModal">Фильтры</p>
          <p
            :class="`product-list__sort-text` + (isSortOpen ? ' active' : '')"
            @click="openSortFilter"
          >
            {{ sortMainText }}
          </p>
          <div class="product-list__sort-select" :class="{ active: isSortOpen }">
            <p
              class="product-list__sort-select-text"
              v-for="sort in sortStates"
              :key="sort"
              @click="selectSort(sort.id, sort.name)"
            >
              {{ sort.name }}
            </p>
          </div>
        </div>
        <div class="product-list__bottom">
          <div class="product-list__products" v-if="productStore.products.length > 0">
            <ProductCard
              v-for="product in productStore.products"
              :key="product.id"
              :product="product"
            ></ProductCard>
          </div>
          <p class="product-list__quantity product-list__quantity_empty" v-else>нет товаров</p>
        </div>
      </div>
    </div>
    <div
      class="product-list__filter-mobile-popup"
      :class="{ active: filterModalStore.isModalOpen }"
    >
      <div class="product-list__filter-mobile-line" @click="closeFilterModal"></div>
      <div class="product-list__filter product-list__filter-mobile">
        <div
          class="product-list__filter-button-container"
          v-for="filter in filterStates"
          @click="toggleFilters(filter.id)"
          :key="filter"
        >
          <div class="product-list__filter-icon" :class="{ active: filter.isActive }"></div>
          <p class="product-list__filter-text">{{ filter.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-list {
}

.product-list__container {
  max-width: 1920px;
  padding: 72px 64px 141px;
  display: flex;
  column-gap: 138px;
  min-height: 800px;
}

.product-list__title {
  display: none;
  font-size: 36px;
  line-height: 31.68px;
  letter-spacing: 0.04;
  margin-bottom: 48px;
}

.product-list__filter {
  width: 166px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  flex-shrink: 0;
}

.product-list__filter-mobile-popup {
  visibility: hidden;
  position: absolute;
  transition:
    transform 0.3s ease,
    visibility 0.3s ease;
}

.product-list__filter-icon {
  width: 36px;
  height: 22px;
  background-image: url('../assets/images/icons/switch-off.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 36px 22px;
  cursor: pointer;
  transition: background-image 0.2s ease;
}

.product-list__filter-icon.active {
  background-image: url('../assets/images/icons/switch-on.svg');
}

.product-list__filter-text {
  text-transform: uppercase;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  letter-spacing: 0.72px;
}

.product-list__filter-button-container {
  display: flex;
  align-items: center;
  column-gap: 12px;
  cursor: pointer;
}

.product-list__content {
  width: 100%;
}

.product-list__top {
  margin-bottom: 44px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.product-list__filter-mobile-button {
  display: none;
}

.product-list__quantity,
.product-list__sort-text,
.product-list__filter-mobile-button {
  text-transform: uppercase;
  font-size: 12px;
  line-height: 14.52px;
  letter-spacing: 0.96px;
  font-weight: 600;
}

.product-list__quantity_empty {
  display: none;
}

.product-list__sort-text {
  cursor: pointer;
}

.product-list__sort-text::after {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 4px;
  background-image: url('../assets/images/icons/expand-arrow.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transition: opacity 0.3s;
}

.product-list__sort-text.active::after {
  opacity: 0;
}

.product-list__overlay {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 15;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.product-list__overlay.active {
  visibility: visible;
  opacity: 1;
}

.product-list__sort-select {
  position: absolute;
  top: 0;
  right: 1%;
  z-index: 20;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.product-list__sort-select.active {
  visibility: visible;
  opacity: 1;
}

.product-list__sort-select-text {
  text-transform: uppercase;
  padding: 16px 95px 16px 24px;
  font-size: 12px;
  line-height: 14.52px;
  letter-spacing: 0.72px;
  font-weight: 600;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.product-list__sort-select-text:hover {
  background-color: #7bb899;
}

.product-list__bottom {
}

.product-list__products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 24px;
  row-gap: 16px;
}

@media screen and (max-width: 1500px) {
  .product-list__products {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1280px) {
  .product-list__container {
    column-gap: 60px;
    padding: 72px 25px 141px;
  }

  .product-list__products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1024px) {
  .product-list__container {
    column-gap: 100px;
  }

  .product-list__products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .product-list__quantity {
    display: none;
  }

  .product-list__filter-mobile-button {
    cursor: pointer;
    display: block;
  }

  .product-list__filter {
    display: none;
  }

  .product-list__filters-button {
    display: block;
  }

  .product-list__filter-mobile-popup {
    transform: translateY(318px);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 54px 24px 114px;
    z-index: 50;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }

  .product-list__quantity_empty {
    display: block;
    text-align: center;
  }

  .product-list__filter-mobile-popup.active {
    transform: translateY(0);
    visibility: visible;
  }

  .product-list__filter-mobile {
    display: flex;
  }

  .product-list__filter-mobile-line {
    position: absolute;
    width: 28px;
    height: 4px;
    background-color: #1f2020;
    opacity: 40%;
    border-radius: 40px;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}

@media screen and (max-width: 480px) {
  .product-list__container {
    padding: 0 24px 141px;
    flex-direction: column;
  }

  .product-list__products {
    column-gap: 15px;
  }

  .product-list__title {
    display: block;
  }
}
</style>
