import {Component} from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {DriverService} from "../_services/driver.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  webSocketEndPoint: string = 'http://localhost:8080/websocket';
  topic: string = "/broker";
  stompClient: any;

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this._connect()
    setTimeout(() => {
        this._send("Hello")
      },
      5000);
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        console.log(sdkEvent)
      });
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/message", {}, JSON.stringify(message));
  }

}
