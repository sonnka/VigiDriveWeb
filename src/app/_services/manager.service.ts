import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../_models/register.request";
import {LoginService} from "./login.service";
import {ManagerResponse} from "../_models/manager.response";
import {DriverResponse} from "../_models/driver.response";
import {AccessDto} from "../_models/access.dto";
import {AccessDuration} from "../_models/access.duration";
import {AccessRequest} from "../_models/access.request";

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

  getSentAccesses() {
    this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/managers/' + this.id +
      "/accesses/sent", this.httpOptions);
  }

  getActiveAccesses() {
    this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/managers/' + this.id +
      "/accesses/active", this.httpOptions);
  }

  getInactiveAccesses() {
    this.getCredentials();

    return this.http.get<AccessDto[]>(this.baseUrl + '/managers/' + this.id +
      "/accesses/inactive", this.httpOptions);
  }

  extendAccess(accessId: bigint, accessDuration: AccessDuration) {
    this.getCredentials();

    return this.http.patch(this.baseUrl + '/managers/' + this.id +
      "/accesses/" + accessId + "/extend", accessDuration, this.httpOptions);
  }

  requestAccess(accessRequest: AccessRequest) {
    this.getCredentials();

    return this.http.post(this.baseUrl + '/managers/' + this.id +
      "/accesses", accessRequest, this.httpOptions);
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
