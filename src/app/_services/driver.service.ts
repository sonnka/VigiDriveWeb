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
import {DriverRequest} from "../_models/driver.request";
import {DriverLicenseRequest} from "../_models/driver-license.request";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = 'http://localhost:8080';

  private token: string | undefined;
  private id: string | undefined;
  private httpOptions: { headers: HttpHeaders } | undefined;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
  }

  register(data: RegisterRequest) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + '/register/driver', data, httpOptions);
  }

  async getDriver() {
    await this.getCredentials()

    return this.http.get<DriverResponse>(this.baseUrl + '/drivers/' + this.id, this.httpOptions);
  }

  async updateDriver(driverRequest: DriverRequest) {
    await this.getCredentials()

    return await this.http.patch<DriverResponse>(this.baseUrl + "/drivers/" + this.id,
      driverRequest, this.httpOptions).toPromise()
  }

  async updateDriverLicense(driverLicenseRequest: DriverLicenseRequest) {
    await this.getCredentials()

    return await this.http.post<void>(this.baseUrl + "/drivers/" + this.id + "/driver-license", driverLicenseRequest,
      this.httpOptions).toPromise()
  }

  async updateEmergencyContact(emergencyContact: string) {
    await this.getCredentials()

    return await this.http.patch<void>(
      this.baseUrl + "/drivers/" + this.id + "/emergency-number/" + emergencyContact,
      null, this.httpOptions).toPromise()
  }

  async getHealthInfo() {
    await this.getCredentials()

    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + this.id + "/health-info",
      this.httpOptions);
  }

  async getDriverHealthInfo(driverId: string) {
    await this.getCredentials();

    return this.http.get<HealthInfoResponse>(this.baseUrl + '/drivers/' + driverId + "/health-info",
      this.httpOptions);
  }

  async getSituationInfo() {
    await this.getCredentials()

    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + this.id + "/situations/week",
      this.httpOptions);
  }

  async getDriverSituationInfo(driverId: string) {
    await this.getCredentials();

    return this.http.get<SituationResponse[]>(this.baseUrl + '/drivers/' + driverId + "/situations/week",
      this.httpOptions);
  }

  async getWeekSituationStatistic() {
    await this.getCredentials();

    return this.http.get<SituationStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/situations/statistics/week", this.httpOptions);
  }

  async getMonthSituationStatistic() {
    await this.getCredentials();

    return this.http.get<SituationStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/situations/statistics/month", this.httpOptions);
  }

  async getYearSituationStatistic() {
    await this.getCredentials();

    return this.http.get<SituationStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/situations/statistics/year", this.httpOptions);
  }

  async getWeekHealthStatistic() {
    await this.getCredentials();

    return this.http.get<HealthStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/health-info/statistics/week", this.httpOptions);
  }

  async getMonthHealthStatistic() {
    await this.getCredentials();

    return this.http.get<HealthStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/health-info/statistics/month", this.httpOptions);
  }

  async getYearHealthStatistic() {
    await this.getCredentials();

    return this.http.get<HealthStatistics>(this.baseUrl + '/drivers/' + this.id +
      "/health-info/statistics/year", this.httpOptions);
  }

  async getManager() {
    await this.getCredentials();

    return this.http.get<ManagerDto>(this.baseUrl + '/drivers/' + this.id +
      "/manager", this.httpOptions);
  }

  async getAccess(accessId: bigint) {
    await this.getCredentials();

    return this.http.get<AccessDto>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/" + accessId, this.httpOptions);
  }

  async getAccessRequests() {
    await this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/requests", this.httpOptions);
  }

  async getActiveAccesses() {
    await this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/active", this.httpOptions);
  }

  async getInactiveAccesses() {
    await this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/drivers/' + this.id +
      "/accesses/inactive", this.httpOptions);
  }

  async giveAccess(accessId: bigint) {
    await this.getCredentials();

    return this.http.post(this.baseUrl + '/drivers/' + this.id +
      "/accesses/" + accessId, null, this.httpOptions);
  }

  async stopAccess(accessId: bigint) {
    await this.getCredentials();

    return this.http.patch(this.baseUrl + '/drivers/' + this.id +
      "/accesses/" + accessId + "/stop", null, this.httpOptions);
  }

  async deleteDriver() {
    await this.getCredentials();

    return await this.http.delete(this.baseUrl + '/drivers/' + this.id, this.httpOptions).toPromise();
  }

  private async getCredentials() {
    this.token = await this.loginService.getToken().then();
    this.id = await this.loginService.getUserId().then();

    if (!this.token || !this.id) {
      await LoginService.logout(this.router);
      throw new Error("Something went wrong!")
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }
}
