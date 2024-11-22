<script setup>
import closeCartModalIcon from '../assets/images/icons/empty-circle.svg'
import { useCartStore } from '@/store/cartStore'
import { useModalStore } from '@/store/modalStore'
import { words } from '@/constants'
import { computed } from 'vue'

const modalStore = useModalStore()
const cartStore = useCartStore()

const closeModal = (modalName) => {
  modalStore.closeModal(modalName)
  document.body.style.overflow = 'auto'
}

const getWordForm = (number, words) => {
  number = Math.abs(number) % 100
  const lastDigit = number % 10

  if (number > 10 && number < 20) {
    return words[2]
  }

  if (lastDigit === 1) {
    return words[0]
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1]
  }

  return words[2]
}

const cartWord = computed(
  () => `${cartStore.getCartLength} ${getWordForm(cartStore.getCartLength, words)}`,
)
</script>

<template>
  <div class="cart-modal" :class="{ active: modalStore.modals.cartModal }">
    <div
      class="cart-modal__overlay"
      :class="{ active: modalStore.modals.cartModal }"
      @click="closeModal('cartModal')"
    ></div>
    <div class="cart-modal__container" :class="{ active: modalStore.modals.cartModal }">
      <div class="cart-modal__top">
        <p class="cart-modal__title">Корзина</p>
        <img :src="closeCartModalIcon" class="cart-modal__close" @click="closeModal('cartModal')" />
      </div>
      <div class="cart-modal__content">
        <div class="cart-modal__list-header">
          <p class="cart-modal__list-header-text">{{ cartWord }}</p>
          <p class="cart-modal__list-header-clear" @click="cartStore.clearCart">очистить список</p>
        </div>
        <div class="cart-modal__list">
          <div class="cart-modal__list-item" v-for="product in cartStore.cart" :key="product">
            <img
              class="cart-modal__list-item-image"
              :class="{ predeleted: product.predeleted }"
              :src="product.image"
            />
            <div class="cart-modal__list-item-info" :class="{ predeleted: product.predeleted }">
              <p class="cart-modal__list-item-name">{{ product.name }}</p>
              <p class="cart-modal__list-item-price">{{ product.price * product.quantity }} ₽</p>
            </div>
            <div class="cart-modal__list-item-quantity" :class="{ predeleted: product.predeleted }">
              <button
                class="cart-modal__list-item-quantity-button minus"
                :class="{
                  'cart-modal__list-item-quantity-button_disabled': product.quantity === 1,
                }"
                @click="cartStore.decrement(product)"
              ></button>
              <p class="cart-modal__list-item-quantity-text">{{ product.quantity }}</p>
              <button
                class="cart-modal__list-item-quantity-button plus"
                @click="cartStore.increment(product)"
              ></button>
            </div>
            <button
              class="cart-modal__list-item-delete-button"
              :class="{ restore: product.predeleted }"
              @click="cartStore.togglePreDelete(product)"
            ></button>
          </div>
        </div>
      </div>
      <div class="cart-modal__bottom">
        <div
          class="cart-modal__total"
          :class="{
            'cart-modal__total_disabled':
              cartStore.getCartLength === 0 ||
              cartStore.cart.filter((item) => !item.predeleted).length === 0,
          }"
        >
          <p class="cart-modal__total-text">Итого</p>
          <p class="cart-modal__total-price">{{ cartStore.getTotalPrice }} ₽</p>
        </div>
        <button
          class="cart-modal__button"
          :class="{
            'cart-modal__button_disabled':
              cartStore.getCartLength === 0 ||
              cartStore.cart.filter((item) => !item.predeleted).length === 0,
          }"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-modal {
  visibility: hidden;
}

.cart-modal.active {
  visibility: visible;
}

.cart-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 25;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
}

.cart-modal__overlay.active {
  opacity: 1;
  visibility: visible;
}

.cart-modal__container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  padding: 32px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  z-index: 26;
  transform: translateX(100%);
  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  visibility: hidden;
}

.cart-modal__container.active {
  visibility: visible;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

.cart-modal__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
}

.cart-modal__title {
  font-size: 30px;
  font-weight: 600;
  line-height: 26.4px;
  letter-spacing: -1.2px;
}

.cart-modal__close {
  cursor: pointer;
  width: 48px;
  height: 48px;
  background-image: url('../assets/images/icons/close.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px;
}

.cart-modal__content {
  display: flex;
  flex-direction: column;
}

.cart-modal__list-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
}

.cart-modal__list-header-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 15.68px;
}

.cart-modal__list-header-clear {
  cursor: pointer;
  opacity: 40%;
  font-size: 14px;
  font-weight: 300;
  line-height: 15.68px;
  transition: opacity 0.3s ease-in-out;
}

.cart-modal__list-header-clear:hover {
  opacity: 100%;
}

.cart-modal__list {
  max-height: calc(100vh - 350px);
  overflow-y: auto;
  scrollbar-width: none;
}

.cart-modal__list-item {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.cart-modal__list-item:last-of-type {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.predeleted {
  opacity: 40%;
  pointer-events: none;
}

.cart-modal__list-item-image {
  width: 96px;
  height: 96px;
  object-fit: cover;
  object-position: center;
  margin-right: 8px;
}

.cart-modal__list-item-info {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  max-width: 165px;
  width: 100%;
  margin-right: 62px;
}

.cart-modal__list-item-name {
  font-size: 16px;
  line-height: 17.92px;
  letter-spacing: 0.32px;
}

.cart-modal__list-item-price {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
}

.cart-modal__list-item-quantity {
  display: flex;
  column-gap: 48px;
  position: relative;
  margin-right: 37px;
}

.cart-modal__list-item-quantity-button {
  width: 40px;
  height: 24px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.cart-modal__list-item-quantity-button:hover {
  background-color: #d9d9d9;
}

.cart-modal__list-item-quantity-button_disabled {
  visibility: hidden;
}

.cart-modal__list-item-quantity-button.minus {
  background-image: url('../assets/images/icons/minus.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
}
.cart-modal__list-item-quantity-button.plus {
  background-image: url('../assets/images/icons/plus.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
}

.cart-modal__list-item-quantity-text {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}

.cart-modal__list-item-delete-button {
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

.cart-modal__list-item-delete-button.restore {
  background-image: url('../assets/images/icons/repeat.svg');
}

.cart-modal__bottom {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.cart-modal__total {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
}

.cart-modal__total_disabled {
  visibility: hidden;
}

.cart-modal__total-text {
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
}

.cart-modal__total-price {
  font-size: 30px;
  line-height: 30px;
  font-weight: 500;
  letter-spacing: -1.2px;
}

.cart-modal__button {
  cursor: pointer;
  width: 240px;
  height: 56px;
  background-color: #7bb899;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 14.52px;
  letter-spacing: 0.72px;
  transition: transform 0.3s ease-in-out;
}

.cart-modal__button:hover:not(.cart-modal__button_disabled) {
  transform: scale(1.05);
}

.cart-modal__button:active:not(.cart-modal__button_disabled) {
  transform: scale(0.95);
}

.cart-modal__button_disabled {
  opacity: 60%;
  background-color: rgb(124, 124, 124);
  cursor: not-allowed;
  color: rgb(148, 20, 20);
}

@media screen and (max-width: 768px) {
  .cart-modal__container {
    padding: 32px 20px;
  }

  .cart-modal__list-item {
    position: relative;
  }

  .cart-modal__list-item-image {
    grid-area: image;
  }

  .cart-modal__list-item-info {
    margin-right: 10px;
    max-width: none;
    grid-area: info;
  }

  .cart-modal__list-item-quantity {
    margin-right: 15px;
    grid-area: quantity;
  }

  .cart-modal__list-item-delete-button {
    grid-area: delete;
  }
}

@media screen and (max-width: 480px) {
  .cart-modal__list-item {
    position: relative;
    display: grid;
    grid-template-areas:
      'image info delete'
      'quantity info delete';
    row-gap: 10px;
    column-gap: 5px;
    align-items: start;
  }

  .cart-modal__list-item-info {
    margin-left: 10px;
  }

  .cart-modal__list-item-image {
    justify-self: center;
    margin-right: 0;
  }

  .cart-modal__list-item-name {
    max-width: none;
  }

  .cart-modal__list-item-quantity {
    display: flex;
    justify-content: space-around;
    margin-right: 0;
    column-gap: 14px;
  }

  .cart-modal__list-item-delete-button {
    grid-area: delete;
    align-self: flex-end;
  }

  .cart-modal__total-text {
    font-size: 14px;
  }

  .cart-modal__total-price {
    font-size: 22px;
  }

  .cart-modal__button {
    width: 150px;
  }
}
</style>
