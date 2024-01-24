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
    let token = this.loginService.getToken();
    let id = this.loginService.getUserId();

    console.log("Id: " + id + " | token: " + token);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<DriverResponse>(this.baseUrl + '/drivers/' + id, httpOptions);
  }

  getHealthInfo() {
    let token = this.loginService.getToken();
    let id = this.loginService.getUserId();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + id + "/health-info", httpOptions);
  }

  getSituationInfo() {
    let token = this.loginService.getToken();
    let id = this.loginService.getUserId();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + id + "/situations/week",
      httpOptions);
  }
}
