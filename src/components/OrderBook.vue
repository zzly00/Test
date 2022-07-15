<script setup lang="ts">
import { computed } from 'vue'
import QuoteTable from './QuoteTable.vue';
import usePrice from '../composition/usePrice';
import useOrderBook from '../composition/useOrderBook';
import { formatPrice } from '../formatHelper';

const { priceState } = usePrice();
const { orderBookState } = useOrderBook();

const asks = computed(() => orderBookState.asks);
const bids = computed(() => orderBookState.bids);

</script>

<template>
  <div class="orderbook">
    <p class="orderbook__title">Order Book</p>
    <QuoteTable :showHead="true" :quoteType="'sell'" :quoteData="asks" />
    <p class="orderbook__price" :class="priceState.colorStyle">{{ formatPrice(priceState.currentPrice) }} 
      <font-awesome-icon icon="fa-solid fa-arrow-up" v-if="priceState.colorStyle === 'higher'" />
      <font-awesome-icon icon="fa-solid fa-arrow-down" v-if="priceState.colorStyle === 'lower'" />
    </p>
    <QuoteTable :showHead="false" :quoteType="'buy'" :quoteData="bids" />
  </div>
</template>

<style scoped lang="scss">
.orderbook {
  background-color: #131B29;
  margin: 50px auto 0 auto;
  width: 100%; 
}

.orderbook__title {
  font-size: 16px;
  color: #F0F4F8;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #F0F4F8;
}

.orderbook__price {
  padding: 5px 0;
  font-size: 14px;
  font-weight: bold;
  color: #F0F4F8;
  background-color: rgba(134, 152, 170, 0.12);
}

.orderbook__price.higher {
  color: #00b15d;
  background-color: rgba(16, 186, 104, 0.12);
}

.orderbook__price.lower {
  color: #FF5B5A;
  background-color: rgba(255, 90, 90, 0.12);
}

@media only screen and (min-width: 375px) {
  .orderbook {
    max-width: 250px;
  }
}
</style>
