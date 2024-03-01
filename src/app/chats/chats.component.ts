import {Component} from '@angular/core';
import {MessageService} from "../_services/message.service";
import {MessagesResponse} from "../_models/messages.response";
import {UserResponse} from "../_models/user.response";
import {LoginService} from "../_services/login.service";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {MessageRequest} from "../_models/message.request";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {

  protected chatHistory: MessagesResponse | undefined;
  protected chats: UserResponse[] | undefined;
  protected isSelected = false;
  private webSocketEndPoint: string = 'http://localhost:8080/websocket';
  private topic: string = "/broker";
  private stompClient: any;


  constructor(private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
    this.isSelected = false;
    this.getChats()
    this.connectToWebsocket()
  }

  getChats() {
    this.messageService.getChats()
      .subscribe(response => {
          this.chats = response;
        }, error => {
          this.displayError(error)
        }
      );
  }

  async connectToWebsocket() {
    let webSocket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(webSocket);
    const _this = this;

    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        console.log(sdkEvent)
        _this.chatHistory = <MessagesResponse>sdkEvent.body
      });
    }, this.errorCallBack);

  }

  select(receiverId: bigint) {
    this.isSelected = true;
    this.clearSelecting();
    document.getElementById(receiverId.toString())?.classList.add("active");
    this.messageService.getChatHistory(receiverId)
      .subscribe(response => {
          this.chatHistory = response;
        }, error => {
          this.displayError(error)
        }
      );


  }

  errorCallBack(error: any) {
    console.log("ErrorCallBack -> " + error)
    setTimeout(() => {
      this.connectToWebsocket();
    }, 5000);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendMessage(message: string, receiverId: bigint | undefined) {
    if (receiverId != null) {
      this.messageService.sendMessage(this.stompClient, new MessageRequest(message), receiverId);
    } else {
      AppComponent.showError("Something went wrong during message sending.")
    }
  }

  private clearSelecting() {
    for (let i = 0; i < this.chats!.length; i++) {
      if (document.getElementById(this.chats![i].toString())?.classList.contains("active")) {
        document.getElementById(this.chats![i].toString())?.classList.remove("active");
      }
    }
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout()
      this.router.navigate(['/login']);
    }
    if (error.error != null) {
      console.log(error.error)
      AppComponent.showError(error.error.errorMessage)
    } else {
      console.log(error)
      AppComponent.showError(error.message)
    }
  }
}