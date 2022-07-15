export interface OrderBookMessage {
  topic?: string;
  data?: {
    bids: string[][];
    asks: string[][];
    seqNum: number;
    prevSeqNum: number;
    type: string;
    timestamp: number;
    symbot: string;
  };
  event?: string;
  channel?: string[];
};
  
export interface OrderBookInfo {
  price: string;
  size: string;
  total?: number;
};