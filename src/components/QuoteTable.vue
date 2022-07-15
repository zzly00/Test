<script setup lang="ts">
import { OrderBookInfo } from '../interface';
import { formatNumber } from '../formatHelper';

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
          <tr v-for="item in quoteData" :key="item.price" :class="item.orderStyle">
            <td class="quotetable__price">{{ formatNumber(item.price) }}</td>
            <td class="quotetable__size" :class="item.orderStyle">{{ formatNumber(item.size) }}</td>
            <td class="quotetable__total">{{ formatNumber(item.total) }}</td>
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

.buy td.quotetable__price {
  color: #00B15D;
}

.buy tr.new, td.lower {
  background-color: rgba(255, 255, 255, 0);
  animation: buyAnimation 0.3s linear;
}

.sell td.quotetable__price {
  color: #FF5B5A;
}

.sell tr.new, td.higher {
  background-color: rgba(255, 255, 255, 0);
  animation: sellAnimation 0.3s linear;
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

@keyframes sellAnimation {
  from {
    background-color: translateX(0%); 
  }

  to {
    background-color: rgba(255, 91, 90, 0.5);
  }
}

@keyframes buyAnimation {
  from {
    background-color: translateX(0%); 
  }

  to {
    background-color: rgba(0, 177, 93, 0.5);
  }
}
</style>
