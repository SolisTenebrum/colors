<script setup>
import { register } from 'swiper/element/bundle'
import {
  slideOne,
  slideTwo,
  slideThree,
  slideFour,
  slideFive,
  slideSix,
} from '@/assets/images/slider-images'

import 'swiper/swiper-bundle.css'
import { ref } from 'vue'
register()

const slides = [
  {
    image: slideOne,
    title: 'Краски',
    subtitle: 'Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!',
    alt: 'Ваза с цветком на зеленом фоне',
  },
  {
    image: slideTwo,
    title: 'Lorem ipsum.',
    subtitle: 'In hac habitasse platea dictumst.',
    alt: 'Ваза с цветком на зеленом фоне',
  },
  {
    image: slideThree,
    title: 'Dolor sit amet.',
    subtitle: 'Sed porta justo eu nunc vehicula, quis ultricies odio laoreet.',
    alt: 'Ваза с цветком на зеленом фоне',
  },
  {
    image: slideFour,
    title: 'Consectetur.',
    subtitle: 'In lorem sapien, ullamcorper sit amet neque sed, vestibulum tempus dui. ',
    alt: 'Ваза с цветком на зеленом фоне',
  },
  {
    image: slideFive,
    title: 'Adipiscing elit.',
    subtitle:
      'Proin cursus sed justo in viverra. Vivamus dapibus sapien sed eros tempor consequat.',
    alt: 'Ваза с цветком на зеленом фоне',
  },
  {
    image: slideSix,
    title: 'Sed ultricies.',
    subtitle:
      'Vivamus ac neque vitae lacus sodales rutrum eu vitae diam. Suspendisse luctus magna et accumsan tempor. Pellentesque et viverra erat.',
    alt: 'Ваза с цветком на зеленом фоне',
  },
]
const activeSlide = ref(0)
const swiperRef = ref(null)

const goToSlide = (index) => {
  swiperRef.value.swiper.slideTo(index)
}

const onSlideChange = () => {
  if (swiperRef.value) {
    activeSlide.value = swiperRef.value.swiper.realIndex
  }
}
</script>

<template>
  <section class="home-slider">
    <div class="home-slider__container">
      <div class="home-slider__links">
        <p class="home-slider__link"><a href="#">Главная</a></p>
        <p class="home-slider__link"><a href="#">Продукты</a></p>
        <p class="home-slider__link"><a href="#">Краски</a></p>
      </div>
      <swiper-container
        ref="swiperRef"
        class="swiper"
        :slides-per-view="1"
        @swiperslidechange="onSlideChange"
        loop="true"
        :navigation="{ nextEl: '.next', prevEl: '.prev' }"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
      >
        <swiper-slide class="home-slider__slide" v-for="slide in slides" :key="slide">
          <div class="home-slider__text">
            <h2 class="home-slider__title">{{ slide.title }}</h2>
            <p class="home-slider__subtitle">{{ slide.subtitle }}</p>
          </div>

          <img class="home-slider__image" :src="slide.image" :alt="slide.alt"
        /></swiper-slide>
      </swiper-container>
      <div class="home-slider__pagination">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="home-slider__pagination-button"
          :class="{ active: activeSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
      <button class="home-slider__button prev"></button>
      <button class="home-slider__button next"></button>
    </div>
  </section>
</template>

<style scoped>
.home-slider {
  padding-top: 110px;
}

.home-slider__container {
  max-width: 1920px;
  height: 560px;
  position: relative;
}

.home-slider__links {
  position: absolute;
  z-index: 2;
  display: flex;
  column-gap: 20px;
  color: #fff;
  opacity: 30%;
  top: 32px;
  left: 64px;
}

.home-slider__link {
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  font-weight: 400;
}

.home-slider__link::after {
  content: '';
  width: 3px;
  height: 3px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin-left: 8px;
}

.home-slider__link:last-of-type::after {
  display: none;
}

.home-slider__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
  cursor: grab;
}

.home-slider__image:active {
  cursor: grabbing;
}

.swiper {
  width: 100%;
  height: 100%;
}

.home-slider__slide {
  position: relative;
}

.home-slider__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 490px;
  width: 100%;
}

.home-slider__title {
  font-size: 72px;
  line-height: 63.36px;
  font-weight: 500;
  letter-spacing: -1.44px;
  margin-bottom: 24px;
  text-align: center;
}

.home-slider__subtitle {
  font-size: 16px;
  line-height: 20.8px;
  font-weight: 500;
  letter-spacing: 1.44px;
  text-align: center;
}

.home-slider__button {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  border: none;
  background-image: url('../assets/images/icons/chevron.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
  background-color: transparent;
  padding: 0;
}

.home-slider__button.next {
  left: auto;
  right: 20px;
  transform: scaleX(-1) translateY(-50%);
}

.home-slider__pagination {
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: #000;
  opacity: 40%;
  padding: 13px 24px;
  border-radius: 16px;
  bottom: 40px;
  left: 50%;
  z-index: 5;
  transform: translateX(-50%);
}

.home-slider__pagination-button {
  width: 6px;
  height: 6px;
  background-color: #fff;
  opacity: 20%;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    opacity 0.3s;
  border-radius: 50%;
  padding: 0;
}

.home-slider__pagination-button:hover {
  opacity: 1;
  background-color: #7bb899;
}

.active {
  opacity: 1;
}

@media (max-width: 1024px) {
  .home-slider {
    padding-top: 98px;
  }

  .home-slider__title {
    font-size: 55px;
  }

  .home-slider__subtitle {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .home-slider {
    padding-top: 65px;
  }

  .home-slider__container {
    height: 360px;
  }

  .home-slider__text {
    color: #ffffff;
    max-width: 250px;
  }

  .home-slider__title {
    font-size: 35px;
    margin-bottom: 10px;
    text-shadow: 1px 2px 2px #000000;
  }

  .home-slider__subtitle {
    font-size: 12px;
    text-shadow: 1px 2px 2px #000000;
  }

  .home-slider__pagination {
    bottom: 20px;
  }

  .home-slider__links {
    z-index: 2;
    column-gap: 20px;
    opacity: 30%;
    top: 32px;
    left: 24px;
  }

  .home-slider__pagination {
    padding: 8px 16px;
  }

  .home-slider__button {
    width: 60px;
    height: 60px;
  }
}

@media screen and (max-width: 480px) {
  .swiper {
    display: none;
  }

  .home-slider {
    padding-top: 86px;
    margin-bottom: 48px;
  }

  .home-slider__container {
    height: unset;
    padding-left: 24px;
  }

  .home-slider__links {
    color: #1f2020;
    position: unset;
  }

  .home-slider__link::after {
    background-color: #1f2020;
  }

  .home-slider__pagination {
    display: none;
  }

  .home-slider__button {
    display: none;
  }
}
</style>
