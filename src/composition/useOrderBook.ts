import { reactive, readonly } from 'vue';
import SocketUtil from '../SocketUtil';
import { OrderBookMessage, OrderBookInfo } from '../interface';

export default () => {
  const orderBookState: {
    bids: OrderBookInfo[],
    asks: OrderBookInfo[]
  } = reactive({
    bids: [],
    asks: [],
  });

  let totalAsks: string[][] = [[]];
  let totalBids: string[][] = [[]];

  const formatOrderBook = (orders?: readonly (readonly string[])[], isAsks: boolean = false) => {
    if (!orders || orders.length === 0) return [] as OrderBookInfo[];
  
    const reduceCallback = (previousValue: OrderBookInfo[], currentValue: readonly string[]) => {
      const previousTotal = previousValue.length === 0 ? 0 : previousValue[previousValue.length - 1].total;
      
      previousValue.push({
        price: currentValue[0], 
        size: currentValue[1], 
        total: Number(previousTotal) + Number(currentValue[1]),
        orderStyle: currentValue[2] === undefined ? 'new' : (currentValue[2] === 'new' ? '' : currentValue[2]),
      });
      return previousValue;
    };
  
    const quotes: OrderBookInfo[] = isAsks ? orders.reduceRight(reduceCallback, [] as OrderBookInfo[]).reverse() : orders.reduce(reduceCallback, [] as OrderBookInfo[]);
    return quotes;
  };

  const setOrderBookState = () => {
    orderBookState.asks = formatOrderBook(totalAsks.slice(-8), true);
    orderBookState.bids = formatOrderBook(totalBids.slice(0, 8));
  };

  const filterZeroOrder = (oldOrders: string[][], newOrders: string[][]) => {
    return oldOrders.filter(oldData => {
      const newData = newOrders.find(order => order[0] === oldData[0]);
      return !newData || newData[1] !== '0';
    });
  };

  const modifyOrders = (oldOrders: string[][], newOrders: string[][]) => {
    const removeList: string[] = [];
    const addOrders = oldOrders.map(oldOrder => {
      const newOrder = newOrders.find(order => order[0] === oldOrder[0]);
      if (newOrder) {
        removeList.push(newOrder[0]);
        oldOrder[2] = Number(oldOrder[1]) > Number(newOrder[1]) ? 'higher' : (Number(oldOrder[1]) < Number(newOrder[1]) ? 'lower' : '');
        oldOrder[1] = newOrder[1];
      };
      return oldOrder;
    });
    
    newOrders = newOrders.filter(order => !removeList.includes(order[0]));
    return {
      oldOrders: addOrders,
      newOrders
    };
  };

  const updateOrderBook = (orders: OrderBookMessage) => {
    let newAsks = orders.data!.asks;
    let newBids = orders.data!.bids;
    totalAsks = filterZeroOrder(totalAsks, newAsks);
    totalBids = filterZeroOrder(totalBids, newBids);

    newAsks = newAsks.filter(ask => ask[1] !== '0');
    newBids = newBids.filter(bid => bid[1] !== '0');
    const { oldOrders: modifyAsks, newOrders: modifyNewAsks } = modifyOrders(totalAsks, newAsks);
    totalAsks = modifyAsks;
    newAsks = modifyNewAsks;
    const { oldOrders: modifyBids, newOrders: modifyNewBids } = modifyOrders(totalBids, newBids);
    totalBids = modifyBids;
    newBids = modifyNewBids;

    totalAsks = [ ...totalAsks, ...newAsks].sort((a, b) => Number(b[0]) - Number(a[0]));
    totalBids = [ ...totalBids, ...newBids].sort((a, b) => Number(b[0]) - Number(a[0]));
  };

  const getOrderBook = (message: OrderBookMessage) => {
    if (message.data && message.data.type === 'snapshot') {
      totalBids = message.data.bids;
      totalAsks = message.data.asks;
    } else if (message.data && message.data.type === 'delta') {
      updateOrderBook(message);
    }

    setOrderBookState();
  };
  SocketUtil('wss://ws.btse.com/ws/oss/futures', { op: "subscribe", args: ["update:BTCPFC"] }, getOrderBook);

  return {
    orderBookState: readonly(orderBookState)
  }
};