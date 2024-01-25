import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../_models/login.request";
import {LoginResponse} from "../_models/login.response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public static isAuthorize(): boolean {
    let token = localStorage.getItem('token');
    let expireDate = localStorage.getItem("expires_at")

    if (token == null || expireDate == null) {
      return false;
    }

    if (Date.now() > Date.parse(expireDate)) {
      localStorage.clear()
      return false;
    }

    return true;
  }

  public static logout() {
    localStorage.clear();
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
      })
    };

    let response = this.http.post<LoginResponse>(this.baseUrl + '/login', '', httpOptions);

    response.subscribe(r => this.setUserId(r.id));

    return response;
  }

  setToken(token: string) {
    let t = JSON.parse(atob(token.split('.')[1]));
    let expireDate = new Date(t.exp * 1000);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', expireDate.toISOString())
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  setUserId(id: bigint) {
    localStorage.setItem('id', id.toString());
  }

  getUserId(): string {
    return localStorage.getItem('id') ?? '';
  }
}
