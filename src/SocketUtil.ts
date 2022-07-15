interface SocketRequest {
  op: string;
  args: string[];
};

export default (socketUrl: string, socketRequest: SocketRequest, callback: Function) => {
  // const socketUrl: string = 'wss://ws.btse.com/ws/futures';
  let ws: WebSocket = new WebSocket(socketUrl);;
  let isWebSocketConnected: boolean = true;

  // ws.onopen = () => {
  //   console.log("onopen")
  //   isWebSocketConnected = true;
  // }

  ws.onopen = () => {
    console.log("open")
    isWebSocketConnected = true;

    ws.send(JSON.stringify(socketRequest));
  }  

  ws.onmessage = message => {
    const msg =  JSON.parse(message.data);
    // console.log("on message",msg)
    callback(msg);
  };

  // const subscribe = (message: object) => {
  //   // ws.onmessage = message => {
  //   //   const msg =  JSON.parse(message.data);
  //   //   console.log(message)
  //   // };
  // };

  const sendMessage = (message: any) => {
    ws.send(JSON.stringify(message));
  };

  // ws.onclose = e => {
  //   console.log("websocket close");
  //   isWebSocketConnected = false;
  // };

  // const closeSocket = () => {
  //   ws.onclose = e => {
  //     console.log("websocket close");
  //     isWebSocketConnected = false;
  //   };
  // }
  


  return {
    // connectSocket,
    // subscribe,
    sendMessage
  };
}