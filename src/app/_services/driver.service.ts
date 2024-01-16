import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {DriverResponse} from "../_models/driver.response";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequest) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + '/register/driver', data, httpOptions);
  }

  getDriver(driverId: bigint, token: string) {
    console.log("Id: " + driverId + " | token: " + token);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<DriverResponse>(this.baseUrl + '/drivers/' + driverId, httpOptions);
  }

  getHealthInfo(driverId: bigint, token: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.baseUrl + '/drivers/' + driverId + "/health-info", '', httpOptions);
  }

  getSituationInfo(driverId: bigint, token: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.baseUrl + '/drivers/' + driverId + "situations/week", '', httpOptions);
  }
}
