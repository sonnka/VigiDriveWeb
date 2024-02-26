import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {LoginService} from "./login.service";
import {SituationStatistics} from "../_models/situation.statistics";
import {HealthStatistics} from "../_models/health.statistics";
import {ManagerDto} from "../_models/manager.dto";
import {AccessDto} from "../_models/access.dto";

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

  getDriverHealthInfo(driverId: string) {
    this.getCredentials();

    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + driverId + "/health-info",
      this.httpOptions);
  }

  getSituationInfo() {
    this.getCredentials()

    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + this.id + "/situations/week",
      this.httpOptions);
  }

  getDriverSituationInfo(driverId: string) {
    this.getCredentials();

    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + driverId + "/situations/week",
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

  getWeekHealthStatistic() {
    this.getCredentials();

    return this.http.get<HealthStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/health-info/statistics/week", this.httpOptions);
  }

  getMonthHealthStatistic() {
    this.getCredentials();

    return this.http.get<HealthStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/health-info/statistics/month", this.httpOptions);
  }

  getYearHealthStatistic() {
    this.getCredentials();

    return this.http.get<HealthStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/health-info/statistics/year", this.httpOptions);
  }

  getManager() {
    this.getCredentials();

    return this.http.get<ManagerDto>(this.baseUrl + '/drivers/' + this.id +
      "/manager", this.httpOptions);
  }

  getAccess(accessId: bigint) {
    this.getCredentials();

    return this.http.get<AccessDto>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/" + accessId, this.httpOptions);
  }

  getAccessRequests() {
    this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/requests", this.httpOptions);
  }

  getActiveAccesses() {
    this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/active", this.httpOptions);
  }

  getInactiveAccesses() {
    this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/inactive", this.httpOptions);
  }

  giveAccess(accessId: bigint) {
    this.getCredentials();

    return this.http.post(this.baseUrl + '/drivers/' + this.id +
      "/accesses/" + accessId, null, this.httpOptions);
  }

  stopAccess(accessId: bigint) {
    this.getCredentials();

    return this.http.patch(this.baseUrl + '/drivers/' + this.id +
      "/accesses/" + accessId + "/stop", null, this.httpOptions);
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
