import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {LoginService} from "./login.service";
import {jwtDecode} from "jwt-decode";

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

  getDriver(driverId: bigint | undefined, token: string | undefined) {
    let token2 = this.loginService.getToken();
    let t = jwtDecode(token2);

    console.log("Id: " + driverId + " | token: " + token);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<DriverResponse>(this.baseUrl + '/drivers/' + driverId, httpOptions);
  }

  getHealthInfo(driverId: bigint | undefined, token: string | undefined) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + driverId + "/health-info", httpOptions);
  }

  getSituationInfo(driverId: bigint | undefined, token: string | undefined) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + driverId + "/situations/week",
      httpOptions);
  }
}
