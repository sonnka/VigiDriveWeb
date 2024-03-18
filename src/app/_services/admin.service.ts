import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {DriverDto} from "../_models/response/driver.dto";
import {ManagerDto} from "../_models/response/manager.dto";
import {AdminRequest} from "../_models/request/admin.request";
import {AdminDto} from "../_models/response/admin.dto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080';

  private token: string | undefined;
  private id: string | undefined;
  private httpOptions: { headers: HttpHeaders } | undefined;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
  }

  async addAdmin(email: string) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + email, null, this.httpOptions);
  }

  async approveAdmin(adminId: bigint) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + adminId +
      "/approve", null, this.httpOptions);
  }

  async declineAdmin(adminId: bigint) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + adminId +
      "/decline", null, this.httpOptions);
  }

  async updateAdmin(updatedAdmin: AdminRequest) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + this.id, updatedAdmin, this.httpOptions);
  }

  async getApprovedAdmins() {
    await this.getCredentials()

    return this.http.get<AdminDto>(this.baseUrl + '/admins/approved', this.httpOptions);
  }

  async getNotApprovedAdmins() {
    await this.getCredentials()

    return this.http.get<AdminDto>(this.baseUrl + '/admins/not-approved', this.httpOptions);
  }

  async getDrivers() {
    await this.getCredentials()

    return this.http.get<DriverDto>(this.baseUrl + '/admins/' + this.id +
      "/drivers", this.httpOptions);
  }

  async getManagers() {
    await this.getCredentials()

    return this.http.get<ManagerDto>(this.baseUrl + '/admins/' + this.id +
      "/managers", this.httpOptions);
  }

  async deleteDriver(driverId: bigint) {
    await this.getCredentials()

    return await this.http.delete(this.baseUrl + '/admins/' + this.id +
      "/drivers/" + driverId, this.httpOptions).toPromise();
  }

  async deleteManager(managerId: bigint) {
    await this.getCredentials()

    return await this.http.delete(this.baseUrl + '/admins/' + this.id +
      "/managers/" + managerId, this.httpOptions).toPromise();
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
