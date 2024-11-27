<script setup>
import closeCartModalIcon from '../assets/images/icons/empty-circle.svg'
import { useCartStore } from '@/store/cartStore'
import { useModalStore } from '@/store/modalStore'
import { words } from '@/constants'
import { computed } from 'vue'
import CartCard from './CartCard.vue'
import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

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
          <div class="cart-modal__list-header-line"></div>
        </div>
        <simplebar
          data-simplebar-auto-hide="false"
          class="cart-modal__list"
          force-visible="false"
          :style="{ height: '100%' }"
        >
          <CartCard v-for="product in cartStore.cart" :key="product" :product="product" />
        </simplebar>
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
  padding: 32px 40px 0 40px;
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
  padding-right: 10px;
  padding-left: 10px;
}

.cart-modal__list-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 12px;
  padding: 0 40px 10px;
  position: relative;
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

.cart-modal__list-header-line {
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  width: 90%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
}

.cart-modal__list {
  max-height: calc(100vh - 350px);
  overflow-y: auto;
  padding: 0 30px 0 30px;
}

.cart-modal__bottom {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 0 40px 40px 40px;
  column-gap: 30px;
}

.cart-modal__total {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  flex-shrink: 0;
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
  padding: 20px 58px;
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
  .cart-modal__top {
    padding: 32px 25px 0 25px;
  }

  .cart-modal__list {
    padding: 0 15px;
  }

  .cart-modal__list-header {
    padding: 0 30px 10px;
  }

  .cart-modal__bottom {
    padding: 0 25px 40px;
    column-gap: 18px;
  }
}

@media screen and (max-width: 480px) {
  .cart-modal__list-header {
    padding: 0 25px 10px;
  }

  .cart-modal__list-header-line {
    width: 93%;
  }

  .cart-modal__total-text {
    font-size: 14px;
  }

  .cart-modal__total-price {
    font-size: 22px;
  }

  .cart-modal__button {
    padding: 16px 30px;
  }
}
</style>
