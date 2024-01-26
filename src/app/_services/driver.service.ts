import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {LoginService} from "./login.service";
import {SituationStatistics} from "../_models/situation.statistics";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

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
    return this.http.post(this.baseUrl + '/register/driver', data, httpOptions);
  }

  getDriver() {
    this.getCredentials()

    return this.http.get<DriverResponse>(this.baseUrl + '/drivers/' + this.id, this.httpOptions);
  }

  getHealthInfo() {
    this.getCredentials()

    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + this.id + "/health-info",
      this.httpOptions);
  }

  getSituationInfo() {
    this.getCredentials()

    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + this.id + "/situations/week",
      this.httpOptions);
  }

  getWeekSituationStatistic() {
    this.getCredentials();

    return this.http.get<SituationStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/situations/statistics/week", this.httpOptions);
  }

  getMonthSituationStatistic() {
    this.getCredentials();

    return this.http.get<SituationStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/situations/statistics/month", this.httpOptions);
  }

  getYearSituationStatistic() {
    this.getCredentials();

    return this.http.get<SituationStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/situations/statistics/year", this.httpOptions);
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
