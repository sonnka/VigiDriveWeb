import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {MessagesResponse} from "../_models/messages.response";

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
