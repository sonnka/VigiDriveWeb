import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/request/register.request";
import {LoginService} from "./login.service";
import {ManagerResponse} from "../_models/response/manager.response";
import {DriverResponse} from "../_models/response/driver.response";
import {AccessDto} from "../_models/response/access.dto";
import {AccessDuration} from "../_models/response/access.duration";
import {AccessRequest} from "../_models/request/access.request";
import {ManagerRequest} from "../_models/request/manager.request";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

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
    return this.http.post(this.baseUrl + '/register/manager', data, httpOptions);
  }

  async getManager() {
    await this.getCredentials()

    return this.http.get<ManagerResponse>(this.baseUrl + '/managers/' + this.id, this.httpOptions);
  }

  async updateManager(managerRequest: ManagerRequest) {
    await this.getCredentials()
    return await this.http.patch<void>(this.baseUrl + "/managers/" + this.id, managerRequest,
      this.httpOptions).toPromise()
  }

  async updateDestination(driverId: string, destination: string) {
    await this.getCredentials()

    return await this.http.patch<void>(
      this.baseUrl + "/managers/" + this.id + "/drivers/" + driverId + "/" + destination,
      null, this.httpOptions).toPromise()
  }

  async getDriverInfo(driverId: string) {
    await this.getCredentials()

    return this.http.get<DriverResponse>(this.baseUrl + '/managers/' + this.id + '/drivers/' + driverId,
      this.httpOptions);
  }

  async getSentAccesses() {
    await this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/managers/' + this.id +
      "/accesses/sent", this.httpOptions);
  }

  async getActiveAccesses() {
    await this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/managers/' + this.id +
      "/accesses/active", this.httpOptions);
  }

  async getInactiveAccesses() {
    await this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/managers/' + this.id +
      "/accesses/inactive", this.httpOptions);
  }

  async extendAccess(accessId: bigint, accessDuration: AccessDuration) {
    await this.getCredentials();

    return this.http.patch(this.baseUrl + '/managers/' + this.id +
      "/accesses/" + accessId + "/extend", accessDuration, this.httpOptions);
  }

  async requestAccess(accessRequest: AccessRequest) {
    await this.getCredentials();

    return this.http.post(this.baseUrl + '/managers/' + this.id +
      "/accesses", accessRequest, this.httpOptions);
  }

  async generateGeneralReport(driverId: string) {
    await this.getCredentials();

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text",
        Accept: "application/pdf",
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'arraybuffer' as const
    };

    return this.http.get(this.baseUrl + "/managers/" + this.id + "/drivers/" + driverId + "/general-report",
      httpOptions)
  }

  async generateHealthReport(driverId: string) {
    await this.getCredentials();

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text",
        Accept: "application/pdf",
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'arraybuffer' as const
    };

    return this.http.get(this.baseUrl + "/managers/" + this.id + "/drivers/" + driverId + "/health-report",
      httpOptions)
  }

  async generateSituationReport(driverId: string) {
    await this.getCredentials();

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text",
        Accept: "application/pdf",
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'arraybuffer' as const
    };

    return this.http.get(this.baseUrl + "/managers/" + this.id + "/drivers/" + driverId + "/situation-report",
      httpOptions)
  }

  async deleteManager() {
    await this.getCredentials();

    return await this.http.delete(this.baseUrl + '/managers/' + this.id, this.httpOptions).toPromise();
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
