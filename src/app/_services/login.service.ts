import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../_models/login.request";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  login(data: LoginRequest): Observable<string> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
      })
    };
    return this.http.post<string>(this.baseUrl + '/login', httpOptions);
  }
}
