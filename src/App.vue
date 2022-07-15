<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import OrderBook from './components/OrderBook.vue'
</script>

<template>
  <OrderBook />
</template>

<style lang="scss">
@import './assets/reset.scss';

html, body {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d3136;
}

p, th, td {
  color: #F0F4F8;
}
</style>
