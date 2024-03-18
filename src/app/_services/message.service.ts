import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {MessagesResponse} from "../_models/messages.response";
import {UserResponse} from "../_models/user.response";
import {MessageRequest} from "../_models/message.request";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080';

  private token: string | undefined;
  private id: string | undefined;
  private httpOptions: { headers: HttpHeaders } | undefined;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
  }

  async getChatHistory(receiverId: bigint) {
    await this.getCredentials();

    return this.http.get<MessagesResponse>(this.baseUrl + '/users/' + this.id +
      "/chats/" + receiverId, this.httpOptions);
  }

  async getChats() {
    await this.getCredentials()

    return this.http.get<UserResponse[]>(this.baseUrl + "/users/" + this.id + "/chats", this.httpOptions);
  }

  async sendMessage(stompClient: any, message: MessageRequest, receiverId: bigint) {
    await this.getCredentials()

    let header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    }

    stompClient.send("/users/" + this.id + "/chats/" + receiverId + "/message",
      header,
      JSON.stringify(message));
  }

  private async getCredentials() {
    this.token = await this.loginService.getToken().then();
    this.id = await this.loginService.getUserId().then();

    if (!this.token || !this.id) {
      await LoginService.logout(this.router);
      throw new Error("Something went wrong!")
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }
}
