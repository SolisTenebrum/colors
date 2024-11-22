<script setup>
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="cart-card" v-for="product in cartStore.cart" :key="product">
    <img
      class="cart-card__image"
      :class="{ predeleted: product.predeleted }"
      :src="product.image"
    />
    <div class="cart-card__info" :class="{ predeleted: product.predeleted }">
      <p class="cart-card__name">{{ product.name }}</p>
      <p class="cart-card__price">{{ product.price * product.quantity }} ₽</p>
    </div>
    <div class="cart-card__quantity" :class="{ predeleted: product.predeleted }">
      <button
        class="cart-card__quantity-button minus"
        :class="{
          'cart-card__quantity-button_disabled': product.quantity === 1,
        }"
        @click="cartStore.decrement(product)"
      ></button>
      <p class="cart-card__quantity-text">{{ product.quantity }}</p>
      <button
        class="cart-card__quantity-button plus"
        @click="cartStore.increment(product)"
      ></button>
    </div>
    <button
      class="cart-card__delete-button"
      :class="{ restore: product.predeleted }"
      @click="cartStore.togglePreDelete(product)"
    ></button>
  </div>
</template>

<style scoped>
.cart-card {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
}

.cart-card:last-of-type {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.cart-card__image {
  width: 96px;
  height: 96px;
  object-fit: cover;
  object-position: center;
  margin-right: 8px;
}

.cart-card__info {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  max-width: 165px;
  width: 100%;
  margin-right: 62px;
}

.cart-card__name {
  font-size: 16px;
  line-height: 17.92px;
  letter-spacing: 0.32px;
}

.cart-card__price {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
}

.cart-card__quantity {
  display: flex;
  column-gap: 48px;
  position: relative;
  margin-right: 37px;
}

.cart-card__quantity-button {
  width: 40px;
  height: 24px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.cart-card__quantity-button:hover {
  background-color: #d9d9d9;
}

.cart-card__quantity-button_disabled {
  visibility: hidden;
}

.cart-card__quantity-button.minus {
  background-image: url('../assets/images/icons/minus.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
}
.cart-card__quantity-button.plus {
  background-image: url('../assets/images/icons/plus.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
}

.cart-card__quantity-text {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}

.cart-card__delete-button {
  cursor: pointer;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  background-image: url('../assets/images/icons/close-transparent.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px;
}

.cart-card__delete-button.restore {
  background-image: url('../assets/images/icons/repeat.svg');
}

@media screen and (max-width: 768px) {
  .cart-card {
    position: relative;
  }

  .cart-card__image {
    grid-area: image;
  }

  .cart-card__info {
    margin-right: 10px;
    max-width: none;
    grid-area: info;
  }

  .cart-card__quantity {
    margin-right: 15px;
    grid-area: quantity;
  }

  .cart-card__delete-button {
    grid-area: delete;
  }
}

@media screen and (max-width: 480px) {
  .cart-card {
    position: relative;
    display: grid;
    grid-template-areas:
      'image info delete'
      'quantity info delete';
    row-gap: 10px;
    column-gap: 5px;
    align-items: start;
    justify-content: unset;
    grid-template-columns: 96px 1fr;
  }

  .cart-card__info {
    margin-left: 10px;
  }

  .cart-card__image {
    justify-self: center;
    margin-right: 0;
  }

  .cart-card__name {
    max-width: none;
  }

  .cart-card__quantity {
    display: flex;
    justify-content: space-between;
    margin-right: 0;
    column-gap: 14px;
  }

  .cart-card__delete-button {
    grid-area: delete;
    align-self: flex-end;
    width: 30px;
    height: 30px;
  }

  .cart-card__quantity-button {
    width: 26px;
    height: 30px;
  }
}
</style>
