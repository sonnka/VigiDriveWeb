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
  protected readonly AppComponent = AppComponent;
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
    await this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.updateHistory(JSON.parse(sdkEvent.body) as MessagesResponse)
        _this.scrollDiv()
      });
    }, this.errorCallBack);
  }

  updateHistory(history: MessagesResponse) {
    this.chatHistory = history;
  }

  async select(receiverId: bigint) {
    this.isSelected = true;
    this.clearSelecting();
    document.getElementById(receiverId.toString())?.classList.add("active");
    try {
      await this.getChatHistory(receiverId)
      this.scrollDiv()
    } catch (error) {
      this.displayError(error);
    }
  }

  async getChatHistory(receiverId: bigint) {
    try {
      this.chatHistory = await this.messageService.getChatHistory(receiverId).toPromise();
    } catch (error) {
      this.displayError(error);
    }
  }

  scrollDiv() {
    setTimeout(() => {
      const element = document.getElementById("historyList") as HTMLDivElement;
      element.scrollIntoView()
      element.scrollTo(0, element.scrollHeight)
    }, 100)
  }

  errorCallBack(error: any) {
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
      let input: HTMLInputElement;
      input = document.getElementById("messageText") as HTMLInputElement;
      input.value = ""
    } else {
      AppComponent.showError("Something went wrong during message sending.")
    }
  }

  private clearSelecting() {
    for (const element of this.chats!) {
      if (document.getElementById(element.toString())?.classList.contains("active")) {
        document.getElementById(element.toString())?.classList.remove("active");
      }
    }
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout()
      this.router.navigate(['/login']);
    }
    if (error.error != null) {
      AppComponent.showError(error.error.errorMessage)
    } else {
      AppComponent.showError(error.message)
    }
  }
}
