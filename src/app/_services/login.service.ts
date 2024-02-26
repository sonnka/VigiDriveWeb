import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../_models/login.request";
import {LoginResponse} from "../_models/login.response";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public errorMessage = "";
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

  public static isDriver(): boolean {
    if (!this.isAuthorize()) {
      return false;
    }

    let role = this.getRole();

    if (role == null || role == '') {
      return false
    }

    return role == 'driver';
  }

  public static isManager(): boolean {
    if (!this.isAuthorize()) {
      return false;
    }

    let role = this.getRole();

    if (role == null || role == '') {
      return false
    }

    return role == 'manager';
  }

  public static logout() {
    localStorage.clear();
  }

  private static getRole(): string | null {
    let token = localStorage.getItem('token');

    if (token == undefined) {
      return null;
    }

    let decodedToken: { [key: string]: string };

    decodedToken = jwtDecode(token);

    return decodedToken['role'];
  }

  public login(data: LoginRequest): Observable<LoginResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
      })
    };
    let response = this.http.post<LoginResponse>(this.baseUrl + '/login', '', httpOptions);

    response.subscribe((r) => {
        this.setUserId(r.id)
        this.errorMessage = ""
      },
      (error) => {
        if (error.error != null) {
          this.errorMessage = error.error.errorMessage
        } else {
          this.errorMessage = error.message
        }
      });

    return response;
  }

  public setToken(token: string) {
    let t = JSON.parse(atob(token.split('.')[1]));
    let expireDate = new Date(t.exp * 1000);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', expireDate.toISOString())
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public setUserId(id: bigint) {
    localStorage.setItem('id', id.toString());
  }

  public getUserId(): string {
    return localStorage.getItem('id') ?? '';
  }
}
