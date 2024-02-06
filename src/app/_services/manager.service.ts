import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {LoginService} from "./login.service";
import {ManagerResponse} from "../_models/manager.response";
import {DriverResponse} from "../_models/driver.response";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseUrl = 'http://localhost:8080';
  private token: string | undefined;
  private id: string | undefined;
  private httpOptions: { headers: HttpHeaders } | undefined;

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  register(data: RegisterRequest) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + '/register/manager', data, httpOptions);
  }

  getManager() {
    this.getCredentials()

    return this.http.get<ManagerResponse>(this.baseUrl + '/managers/' + this.id, this.httpOptions);
  }

  getDriverInfo(driverId: string) {
    this.getCredentials()

    return this.http.get<DriverResponse>(this.baseUrl + '/managers/' + this.id + '/drivers/' + driverId,
      this.httpOptions);
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
