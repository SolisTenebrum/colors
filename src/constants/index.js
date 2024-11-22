import {
  slideOne,
  slideTwo,
  slideThree,
  slideFour,
  slideFive,
  slideSix,
} from '@/assets/images/slider-images'

const words = ['товар', 'товара', 'товаров']

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

const filterButtons = [
  {
    id: 1,
    name: 'Новинки',
    isActive: false,
  },
  {
    id: 2,
    name: 'Есть в наличии',
    isActive: false,
  },
  {
    id: 3,
    name: 'Контрактные',
    isActive: false,
  },
  {
    id: 4,
    name: 'Эксклюзивные',
    isActive: false,
  },
  {
    id: 5,
    name: 'Распродажа',
    isActive: false,
  },
]

const sortButtons = [
  {
    id: 1,
    name: 'Сначала дорогие',
    isActive: false,
  },
  {
    id: 2,
    name: 'Сначала недорогие',
    isActive: false,
  },
  {
    id: 3,
    name: 'Сначала популярные',
    isActive: false,
  },
  {
    id: 4,
    name: 'Сначала новые',
    isActive: false,
  },
]

export { words, slides, filterButtons, sortButtons }
