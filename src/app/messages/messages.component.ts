import {Component} from '@angular/core';
import {Client, Message} from '@stomp/stompjs';
import {DriverService} from "../_services/driver.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  private client = new Client();

  constructor(private driverService: DriverService) {
  }

  connect() {
    this.client.configure({
      brokerURL: 'ws://localhost:8080/websocket',
      onConnect: () => {
        console.log("Client connected")
        this.client.subscribe('/broker/messages', (message: Message) => {
          console.log('Received message:', message.body);
        });
        console.log("After subscribe")
      }
    });
  }

  sendMessage() {
    this.client.publish({
      destination: "/message",
      body: JSON.stringify("Helloo")
    });
  }

  ngOnInit(): void {
    console.log('WebSocketImplComponent ngOnInit() called');

    this.connect();

    this.client.activate();

    this.sendMessage();

  }
}
