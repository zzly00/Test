import { SocketRequest } from '../interface';
import usePrice from '../composition/usePrice'; 
import * as SocketUtil from '../SocketUtil';

describe('usePriceTest', () => {
  test("Get_Init_Price", () => {
    mockSocketConnect((mockSocketOnmessage: Function) => {
      mockSocketOnmessage(givenPrice(21000));
    });

    const { priceState } = usePrice();

    expect(priceState).toEqual({
      currentPrice: 21000,
      colorStyle: 'higher'
    });
  });

  test("Update_Price_Higher_Than_Init", () => {
    mockSocketConnect((mockSocketOnmessage: Function) => {
      mockSocketOnmessage(givenPrice(21000));
      mockSocketOnmessage(givenPrice(22000));
    });

    const { priceState } = usePrice();

    expect(priceState).toEqual({
      currentPrice: 22000,
      colorStyle: 'higher'
    });
  });

  test("Update_Price_Lower_Than_Init", () => {
    mockSocketConnect((mockSocketOnmessage: Function) => {
      mockSocketOnmessage(givenPrice(21000));
      mockSocketOnmessage(givenPrice(20000));
    });

    const { priceState } = usePrice();

    expect(priceState).toEqual({
      currentPrice: 20000,
      colorStyle: 'lower'
    });
  });
});

function givenPrice(price: number) {
  return {
    topic: 'tradeHistoryApi:BTCPFC',
    data: [{
      symbol: 'BTCPFC',
      side: 'SELL',
      size: 0.007,
      price,
      tradeId: 118974885,
      timestamp: 1584446020295
    }]
  };
}

function mockSocketConnect(mockSocketOnmessage: Function) {
  jest.spyOn(SocketUtil, 'default').mockImplementation((socketUrl: string, socketRequest: SocketRequest, callback: Function) => {
    mockSocketOnmessage(callback);

    return {
      sendMessage: () => {}
    }
  });
};