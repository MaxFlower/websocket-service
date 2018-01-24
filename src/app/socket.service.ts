import { Injectable } from '@angular/core';

@Injectable()
export class SocketService {
  private host: string = "ws://127.0.0.1:3123";
  private socket: any;

  constructor() {}

  public connect (): void {
    this.socket = new WebSocket(this.host);

    this.socket.onopen = () => {
      this.connected();
    };

    this.socket.onerror = () => {
      console.log('Connection failed');
    };

    this.socket.onmessage = (message) => {
      try {
        let json: any = JSON.parse(message.data);
        // TODO
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
      }
    };

    this.socket.onclose = () => {
      this.disconnected();
    };
  }

  public disconnect (): void {
    this.socket.close();
  }

  private connected(): void {
    console.log('Connected');
  }

  private disconnected(): void {
    console.log('Disconnected');
  }

}
