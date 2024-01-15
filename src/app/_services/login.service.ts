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

  login(data: LoginRequest): Observable<LoginResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
      })
    };
    return this.http.post<LoginResponse>(this.baseUrl + '/login', '', httpOptions);
  }
}
