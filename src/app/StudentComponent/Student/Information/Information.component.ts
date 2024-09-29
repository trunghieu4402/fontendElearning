import { WebSocketService } from './../../../Service/WebSocketService/WebSocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Information',
  templateUrl: './Information.component.html',
  styleUrls: ['./Information.component.css'],
})
export class InformationComponent implements OnInit {
  constructor(private WebSocketService: WebSocketService) {}
  sendMessage(message: string) {
    this.WebSocketService.sendMessage(message);
  }

  ngOnInit() {}
}
