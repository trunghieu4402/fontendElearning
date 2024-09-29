import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { UserStorageService } from '../LocalStorage/UserStorage.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;
  url = 'ws://localhost:8081/totorial';
  topic = '/topic/classUpdates';
  app = '/app/register';

  constructor(private uerStorage: UserStorageService) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('ws://localhost:8081/totorial'), // WebSocket endpoint
      connectHeaders: {
        Authorization: 'Bearer ' + this.uerStorage.getToken(), // Truyền token vào header
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.client.subscribe('/topic/classUpdates', (message) => {
        console.log('Received: ', message.body);
      });
    };

    this.client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  sendMessage(message: string) {
    this.client.publish({ destination: '/app/register', body: message });
  }
}
