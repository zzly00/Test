import { reactive, readonly } from 'vue';
import SocketUtil from '../SocketUtil';
import { LastPriceMessage } from '../interface';

export default () => {
  let lastPrice: number = 0;

  const priceState: {
    currentPrice?: number,
    colorStyle?: string
  } = reactive({
    currentPrice: undefined,
    colorStyle: ''
  });

  const getPrice = (message: LastPriceMessage) => {
    if(message.data && message.data[0]) {
      const currentPrice = message.data[0].price;
  
      priceState.currentPrice = message.data[0].price;

      console.log('getPrice', currentPrice, lastPrice)
      priceState.colorStyle = currentPrice === lastPrice ? '' : currentPrice > lastPrice ? 'higher' : 'lower';
      console.log('getPrice2', priceState.colorStyle)
      
      lastPrice = currentPrice;
    }
  };
  SocketUtil('wss://ws.btse.com/ws/futures', { op: "subscribe", args: ["tradeHistoryApi:BTCPFC"] }, getPrice);

  return {
    priceState: readonly(priceState)
  }
};