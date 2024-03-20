import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {DriverDto} from "../_models/response/driver.dto";
import {ManagerDto} from "../_models/response/manager.dto";
import {AdminRequest} from "../_models/request/admin.request";
import {AdminDto} from "../_models/response/admin.dto";
import {DatabaseHistoryDto} from "../_models/response/database.history.dto";

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

  async getAdmin() {
    await this.getCredentials()

    return this.http.get<AdminDto>(this.baseUrl + '/admins/' + this.id, this.httpOptions);
  }

  async addAdmin(email: string) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + this.id + "/add/" + email, null, this.httpOptions);
  }

  async approveAdmin(newAdminId: bigint) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + this.id +
      "/approve/" + newAdminId, null, this.httpOptions);
  }

  async declineAdmin(newAdminId: bigint) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + this.id +
      "/decline/" + newAdminId, null, this.httpOptions);
  }

  async updateAdmin(updatedAdmin: AdminRequest) {
    await this.getCredentials()

    return this.http.post(this.baseUrl + '/admins/' + this.id, updatedAdmin, this.httpOptions);
  }

  async getApprovedAdmins() {
    await this.getCredentials()

    return await this.http.get<AdminDto[]>(this.baseUrl + '/admins/approved', this.httpOptions).toPromise();
  }

  async getNotApprovedAdmins() {
    await this.getCredentials()

    return await this.http.get<AdminDto[]>(this.baseUrl + '/admins/not-approved', this.httpOptions).toPromise();
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

  async getWeekDatabaseHistory() {
    await this.getCredentials()

    return this.http.get<DatabaseHistoryDto>(this.baseUrl + '/admins/' + this.id +
      "/db/history", this.httpOptions);
  }

  async generateWeekDatabaseReport() {
    await this.getCredentials();

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text",
        Accept: "application/pdf",
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'arraybuffer' as const
    };

    return this.http.get(this.baseUrl + "/admins/" + this.id + "/db/week-report",
      httpOptions)
  }

  async generateMonthDatabaseReport() {
    await this.getCredentials();

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text",
        Accept: "application/pdf",
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'arraybuffer' as const
    };

    return this.http.get(this.baseUrl + "/admins/" + this.id + "/db/month-report",
      httpOptions)
  }

  async exportDatabase() {
    await this.getCredentials();

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text",
        Accept: "application/zip",
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'arraybuffer' as const
    };

    return this.http.get(this.baseUrl + "/admins/" + this.id + "/db/export",
      httpOptions)
  }

  async importDatabase(file: File) {
    await this.getCredentials();

    const formData = new FormData();
    formData.append('file', file);

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.post(this.baseUrl + "/admins/" + this.id + "/db/import", formData,
      httpOptions)
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
