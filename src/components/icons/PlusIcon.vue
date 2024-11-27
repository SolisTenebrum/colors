<script setup>
defineProps({
  variant: {
    type: String,
    default: 'productCard',
  },
})
</script>

<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="variant === 'productCard' ? 'plus-icon_product-card' : 'plus-icon_cart-card'"
  >
    <path
      d="M10 4.16663V15.8333"
      stroke="#1F2020"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.16699 10H15.8337"
      stroke="#1F2020"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.plus-icon_cart-card {
  width: 16px;
  height: 16px;
}

.plus-icon_product-card {
  width: 20px;
  height: 20px;
}
</style>
