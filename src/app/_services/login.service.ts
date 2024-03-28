import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public static isAuthorize(): boolean {
    let token = localStorage.getItem('token');
    let expireDate = localStorage.getItem("expires_at")

    if (token == null || expireDate == null) {
      return false;
    }

    if (Date.now() > Date.parse(expireDate)) {
      localStorage.clear()
      return false;
    }

    return true;
  }

  public static isDriver(): boolean {
    if (!this.isAuthorize()) {
      return false;
    }

    let role = this.getRole();

    if (!role) {
      return false
    }

    return role == 'driver';
  }

  public static isManager(): boolean {
    if (!this.isAuthorize()) {
      return false;
    }

    let role = this.getRole();

    if (!role) {
      return false
    }

    return role == 'manager';
  }

  public static isAdmin(): boolean {
    if (!this.isAuthorize()) {
      return false;
    }

    let role = this.getRole();

    if (!role) {
      return false
    }

    return role == 'admin' || role == 'chief_admin';
  }

  public static isChiefAdmin(): boolean {
    if (!this.isAuthorize()) {
      return false;
    }

    let role = this.getRole();

    if (!role) {
      return false
    }

    return role == 'chief_admin';
  }

  public static async logout(router: Router) {
    localStorage.clear();
    await router.navigate(["/login"])
  }

  private static getRole(): string | null {
    let token = localStorage.getItem('token');

    if (token == undefined) {
      return null;
    }

    let decodedToken: { [key: string]: string };

    decodedToken = jwtDecode(token);

    return decodedToken['role'];
  }

  // public login(data: LoginRequest): Observable<LoginResponse> {
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
  //     })
  //   };
  //   let response = this.http.post<LoginResponse>(this.baseUrl + '/login', '', httpOptions);
  //
  //   response.subscribe((r) => {
  //       this.setUserId(r.id)
  //     },
  //     (error) => {
  //       UtilService.displayAuthError(error)
  //     });
  //   return response;
  // }

  public async login(email: string, password: string) {
    const formData: FormData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    let t = await this.http.post(this.baseUrl +
      '/login', formData, {}).toPromise();
    return t;
  }

  public getCode() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };

    let response;
    this.http.get<any>("http://127.0.0.1:8080/oauth2/authorize?response_type=code&client_id=oidcclient&redirect_uri=http://127.0.0.1:8080/auth", httpOptions)
      .subscribe(
        (res) => {
          response = res
        }
      )
    return response;
  }

  public async setCredentials(token: string, id: bigint) {
    await this.setToken(token)
    await this.setUserId(id)
  }

  public async getToken(): Promise<string> {
    return localStorage.getItem('token') ?? '';
  }

  public async getUserId(): Promise<string> {
    return localStorage.getItem('id') ?? '';
  }

  private async setToken(token: string) {
    let t = JSON.parse(atob(token.split('.')[1]));
    let expireDate = new Date(t.exp);
    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', expireDate.toISOString())
  }

  private async setUserId(id: bigint) {
    localStorage.setItem('id', id.toString());
  }
}
