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
    return localStorage.getItem('token') != null;
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
    localStorage.setItem('token', token);
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
