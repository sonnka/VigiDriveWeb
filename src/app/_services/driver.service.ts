import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = 'http://localhost:8080';

  private token: string | undefined;
  private id: string | undefined;

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  register(data: RegisterRequest) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + '/register/driver', data, httpOptions);
  }

  getDriver() {
    this.getCredentials()
    console.log("Id: " + this.id + " | token: " + this.token);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.get<DriverResponse>(this.baseUrl + '/drivers/' + this.id, httpOptions);
  }

  getHealthInfo() {
    this.getCredentials()
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + this.id + "/health-info", httpOptions);
  }

  getSituationInfo() {
    this.getCredentials()
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + this.id + "/situations/week",
      httpOptions);
  }

  private getCredentials() {
    this.token = this.loginService.getToken();
    this.id = this.loginService.getUserId();

    if (this.token == null || this.id == null) {
      LoginService.logout();
    }
  }
}
