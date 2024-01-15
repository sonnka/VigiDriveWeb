import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";

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

  getDriver(driverId: bigint) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
    };
    return this.http.post(this.baseUrl + '/drivers/' + driverId, '', httpOptions);
  }

  getHealthInfo(driverId: bigint) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
    };
    return this.http.post(this.baseUrl + '/drivers/' + driverId + "/health-info", '', httpOptions);
  }

  getSituationInfo(driverId: bigint) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
    };
    return this.http.post(this.baseUrl + '/drivers/' + driverId + "situations/week", '', httpOptions);
  }
}
