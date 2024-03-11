import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {MessagesResponse} from "../_models/messages.response";
import {UserResponse} from "../_models/user.response";
import {MessageRequest} from "../_models/message.request";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080';

  private token: string | undefined;
  private id: string | undefined;
  private httpOptions: { headers: HttpHeaders } | undefined;

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getChatHistory(receiverId: bigint) {
    this.getCredentials();

    return this.http.get<MessagesResponse>(this.baseUrl + '/users/' + this.id +
      "/chats/" + receiverId, this.httpOptions);
  }

  getChats() {
    this.getCredentials()

    return this.http.get<UserResponse[]>(this.baseUrl + "/users/" + this.id + "/chats", this.httpOptions);
  }

  sendMessage(stompClient: any, message: MessageRequest, receiverId: bigint) {
    this.getCredentials()

    let header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    }

    stompClient.send("/users/" + this.id + "/chats/" + receiverId + "/message",
      header,
      JSON.stringify(message));
  }

  private getCredentials() {
    this.token = this.loginService.getToken();
    this.id = this.loginService.getUserId();

    if (this.token == null || this.id == null) {
      LoginService.logout();
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }
}
