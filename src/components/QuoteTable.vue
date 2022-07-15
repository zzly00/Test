<script setup lang="ts">
import { OrderBookInfo } from '../interface';

 interface Props {
  showHead: boolean;
  quoteType: string;
  quoteData?: OrderBookInfo[];
}

defineProps<Props>();
</script>

<template>
  <div class="quotetable" :class="quoteType">
    <table>
      <thead v-if="showHead">
        <tr>
          <th class="quotetable__price">Price (USD)</th>
          <th class="quotetable__size">Size</th>
          <th class="quotetable__total">Total</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in quoteData" :key="item.price">
            <td class="quotetable__price">{{ item.price }}</td>
            <td class="quotetable__size">{{ item.size }}</td>
            <td class="quotetable__total">{{ item.total }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.quotetable {
  background-color: #131B29;
  width: 100%;
  padding: 5px 0;
}

table {
  width: 100%;
}

th:first-child, td:first-child {
  padding-left: 20px;
}

th:last-child, td:last-child {
  padding-right: 20px;
}

tr {
  line-height: 20px;
}

tbody > tr:hover {
  line-height: 20px;
  background-color: #1E3059; 
}

th {
  font-size: 10px;
  font-weight: lighter;
  color: #8698aa;
  padding: 5px;
}

td {
  font-size: 14px;
}

.buy td {
  color: #00B15D;
}

.sell td {
  color: #FF5B5A;
}

.quotetable__price {
  width: 40%;
  text-align: left;
}

.quotetable__size {
  width: 15%;
  text-align: right;
}

.quotetable__total {
  width: 45%;
  text-align: right;
}
</style>
