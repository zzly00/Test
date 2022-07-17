import { SocketRequest } from './interface';

export default (socketUrl: string, socketRequest: SocketRequest, callback: Function) => {
  let ws: WebSocket = new WebSocket(socketUrl);;
  let isWebSocketConnected: boolean = true;

  ws.onopen = () => {
    console.log("open")
    isWebSocketConnected = true;

    ws.send(JSON.stringify(socketRequest));
  }  

  ws.onmessage = message => {
    const msg =  JSON.parse(message.data);
    callback(msg);
  };

  const sendMessage = (message: any) => {
    ws.send(JSON.stringify(message));
  };

  return {
    sendMessage
  };
}