<script setup>
import logo from '../assets/images/icons/logo.svg'
import closeCartModalIcon from '../assets/images/icons/empty-circle.svg'
import { useCartModalStore } from '@/store/cartModalStore'
import { useCartStore } from '@/store/cartStore'
import { useBurgerModalStore } from '@/store/burgerModalStore'

const cartModalStore = useCartModalStore()
const cartStore = useCartStore()
const burgerModalStore = useBurgerModalStore()

const openCartModal = () => {
  cartModalStore.openModal()
}

const openBurgerModal = () => {
  burgerModalStore.openModal()
}

const closeBurgerModal = () => {
  burgerModalStore.closeModal()
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__burger" @click="openBurgerModal">
        <div class="app-header__burger-line"></div>
        <div class="app-header__burger-line"></div>
        <div class="app-header__burger-line"></div>
      </div>
      <div class="app-header__left">
        <img class="app-header__logo" :src="logo" alt="logo" />
        <nav class="app-header__nav">
          <ul class="app-header__list">
            <li class="app-header__list-item">
              <a class="app-header__link" href="#">Продукты</a>
            </li>
            <li class="app-header__list-item">
              <a class="app-header__link" href="#">Цвета</a>
            </li>
            <li class="app-header__list-item">
              <a class="app-header__link" href="#">Вдохновение</a>
            </li>
            <li class="app-header__list-item">
              <a class="app-header__link" href="#">Советы</a>
            </li>
            <li class="app-header__list-item">
              <a class="app-header__link" href="#">Найти магазин</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="app-header__right">
        <div class="app-header__phone">
          <a class="app-header__phone-link" href="tel:8452217769">+7 (495) 221-77-69</a>
          <p class="app-header__phone-text">Заказать звонок</p>
        </div>
        <div class="app-header__icons">
          <img class="app-header__icon" src="../assets/images/icons/search.svg" alt="search" />
          <img class="app-header__icon" src="../assets/images/icons/profile.svg" alt="profile" />
          <img class="app-header__icon" src="../assets/images/icons/heart.svg" alt="heart" />
        </div>
        <div class="app-header__cart" @click="openCartModal">
          <p class="app-header__cart-icon">{{ cartStore.getCartLength }}</p>
        </div>
      </div>
    </div>
    <div class="app-header__line"></div>
  </header>
  <div class="app-header__burger-menu-overlay" v-if="burgerModalStore.isModalOpen"></div>
  <div class="app-header__burger-menu" v-if="burgerModalStore.isModalOpen">
    <img
      class="app-header__burger-menu-close"
      :src="closeCartModalIcon"
      alt="close"
      @click="closeBurgerModal"
    />
    <nav class="app-header__nav app-header__nav-mobile">
      <ul class="app-header__list app-header__list-mobile">
        <li class="app-header__list-item app-header__list-item-mobile">
          <a class="app-header__link" href="#">Продукты</a>
        </li>
        <li class="app-header__list-item app-header__list-item-mobile">
          <a class="app-header__link" href="#">Цвета</a>
        </li>
        <li class="app-header__list-item app-header__list-item-mobile">
          <a class="app-header__link" href="#">Вдохновение</a>
        </li>
        <li class="app-header__list-item app-header__list-item-mobile">
          <a class="app-header__link" href="#">Советы</a>
        </li>
        <li class="app-header__list-item app-header__list-item-mobile">
          <a class="app-header__link" href="#">Найти магазин</a>
        </li>
      </ul>
    </nav>
    <div class="app-header-burger-menu-bottom">
      <div class="app-header__icons app-header__icons-mobile">
        <img
          class="app-header__icon app-header__icon-mobile"
          src="../assets/images/icons/search.svg"
          alt="search"
        />
        <img
          class="app-header__icon app-header__icon-mobile"
          src="../assets/images/icons/profile.svg"
          alt="profile"
        />
        <img
          class="app-header__icon app-header__icon-mobile"
          src="../assets/images/icons/heart.svg"
          alt="heart"
        />
      </div>
      <div class="app-header__phone app-header__phone-mobile">
        <a class="app-header__phone-link" href="tel:8452217769">+7 (495) 221-77-69</a>
        <p class="app-header__phone-text">Заказать звонок</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: #fff;
}

.app-header__container {
  padding: 36px 64px;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
}

.app-header__burger {
  display: none;
  cursor: pointer;
}

.app-header__burger-line {
  width: 30px;
  height: 3px;
  background-color: #000;
}

.app-header__burger-menu-overlay {
  display: none;
}

.app-header__burger-menu {
  display: none;
  position: relative;
}

.app-header__left {
  display: flex;
  column-gap: 172px;
  align-items: center;
}

.app-header__logo {
  width: 131px;
  height: 26px;
  cursor: pointer;
}

.app-header__nav {
}

.app-header__list {
  display: flex;
  column-gap: 24px;
  list-style: none;
  text-transform: uppercase;
  padding: 0;
}

.app-header__list-item {
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  letter-spacing: 0.84px;
}

.app-header__link {
}

.app-header__right {
  display: flex;
}

.app-header__phone {
  margin-right: 116px;
}

.app-header__phone-link {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: -0.28px;
}

.app-header__phone-text {
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  opacity: 30%;
}

.app-header__icons {
  display: flex;
  align-items: center;
  column-gap: 24px;
  margin-right: 24px;
}

.app-header__icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.app-header__icon:nth-of-type(2) {
  padding-bottom: 3px;
}

.app-header__cart {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;
  background-image: url('../assets/images/icons/circle.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  align-self: center;
}

.app-header__cart-icon {
  font-size: 12px;
  line-height: 14.52px;
  font-weight: 600;
  letter-spacing: 0.84px;
  text-align: center;
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  transform: translateY(-50%);
}

@media screen and (max-width: 1500px) {
  .app-header__left {
    column-gap: 70px;
  }

  .app-header__phone {
    margin-right: 50px;
  }
}

@media screen and (max-width: 1440px) {
  .app-header__container {
    padding: 36px 25px;
  }

  .app-header__left {
    column-gap: 25px;
  }

  .app-header__list {
    column-gap: 12px;
  }

  .app-header__list-item {
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;
    letter-spacing: 0.84px;
  }

  .app-header__phone {
    margin-right: 30px;
  }

  .app-header__phone-link {
    font-size: 14px;
    line-height: 14px;
    letter-spacing: -0.28px;
  }

  .app-header__phone-text {
    font-size: 13px;
    line-height: 13px;
  }

  .app-header__icons {
    display: flex;
    align-items: center;
    column-gap: 14px;
    margin-right: 18px;
  }
}

@media (max-width: 1024px) {
  .app-header__burger {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
  }

  .app-header__left {
    column-gap: 0;
  }
  .app-header__list {
    display: none;
  }

  .app-header__phone {
    display: none;
  }

  .app-header__icons {
    display: none;
  }

  .app-header__cart {
    width: 30px;
    height: 21px;
  }

  .app-header__cart-icon {
    position: absolute;
    top: 50%;
    right: 0;
    left: 3%;
    transform: translateY(-47%);
  }

  .app-header__burger-menu-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 49;
  }

  .app-header__burger-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 50;
    max-width: 100%;
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
  }

  .app-header__burger-menu-close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url('../assets/images/icons/close.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px;
  }

  .app-header__nav-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .app-header-burger-menu-bottom {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .app-header__icons-mobile {
    display: flex;
    align-items: center;
    column-gap: 24px;
    justify-self: center;
    margin-right: 0;
  }

  .app-header__icon-mobile {
    width: 24px;
    height: 24px;
  }

  .app-header__phone-mobile {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    margin-right: 0;
  }

  .app-header__list-mobile {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
  }

  .app-header__list-item-mobile {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.4px;
  }
}

@media (max-width: 768px) {
  .app-header__container {
    padding: 22px 24px;
    column-gap: 20px;
  }

  .app-header__burger {
    row-gap: 4px;
  }

  .app-header__burger-line {
    width: 24px;
    height: 2px;
  }

  .app-header__logo {
    width: 99px;
    height: 21px;
  }

  .app-header__icons {
    display: none;
  }

  .app-header__cart {
    width: 24px;
    height: 24px;
  }

  .app-header__cart-icon {
    position: absolute;
    top: 50%;
    right: 0;
    left: 3%;
    transform: translateY(-50%);
  }

  .app-header__icons-mobile {
    display: flex;
  }
}

@media (max-width: 480px) {
  .app-header__line {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    height: 1px;
    width: 92.2%;
    margin: 0 auto;
    opacity: 6%;
  }

  .app-header-burger-menu-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 40px;
  }

  .app-header__phone-mobile {
    align-self: center;
  }
}
</style>
