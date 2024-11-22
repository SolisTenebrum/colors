<script setup>
import plus from '../assets/images/icons/plus.svg'
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const handleAddToCart = (product) => {
  cartStore.addToCart(product)
}
</script>

<template>
  <div class="product-card">
    <img class="product-card__image" :src="product.image" alt="paint" />
    <div class="product-card__info">
      <p class="product-card__name">{{ product.name }}</p>
      <p class="product-card__price">{{ product.price }} ₽</p>
      <button class="product-card__button" @click="handleAddToCart(product)">
        <img :src="plus" class="product-card__button-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  max-width: 278px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.product-card:hover .product-card__button {
  opacity: 1;
  pointer-events: all;
}

.product-card__image {
  width: 100%;
  margin-bottom: 16px;
  object-fit: cover;
  object-position: center;
}

.product-card__info {
  display: grid;
  grid-template-areas:
    'name name'
    'price button';
  align-items: center;
  row-gap: 16px;
}

.product-card__name {
  grid-area: name;
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
  letter-spacing: 0.32px;
}

.product-card__price {
  grid-area: price;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
}

.product-card__button {
  grid-area: button;
  justify-self: flex-end;
  cursor: pointer;
  width: 80px;
  height: 32px;
  background-color: #7bb899;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.3s ease-in-out,
    transform 0.1s ease-in-out;
}

.product-card__button:hover {
  background-color: #5e8d75;
  transform: scale(1.05);
}

.product-card__button:active {
  transform: scale(0.95);
}

.product-card__button-icon {
  transition: transform 0.3s ease-in-out;
}

@media screen and (max-width: 1024px) {
  .product-card {
    max-width: none;
    width: 100%;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .product-card__button {
    background-color: #f2f2f2;
    opacity: 1;
  }
}

@media screen and (max-width: 480px) {
  .product-card__button {
    width: 40px;
    height: 24px;
  }

  .product-card__button-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
