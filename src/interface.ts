export interface LastPriceMessage {
  topic?: string;
  data?: {
    symbol: string;
    side: string;
    size: number;
    price: number;
    tradeId: number;
    timestamp: number;
  }[];
};

export interface OrderBookMessage {
  topic?: string;
  data?: {
    bids: string[][];
    asks: string[][];
    seqNum: number;
    prevSeqNum: number;
    type: string;
    timestamp: number;
    symbol: string;
  };
  event?: string;
  channel?: string[];
};
  
export interface OrderBookInfo {
  price: string;
  size: string;
  total?: number;
  orderStyle: string;
};

export interface SocketRequest {
  op: string;
  args: string[];
};