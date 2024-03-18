import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {LoginRequest} from "../_models/request/login.request";
import {Router} from "@angular/router";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
  }

  login(email: string, password: string): void {
    let data = new LoginRequest(email, password);

    this.loginService.login(data).subscribe(async (response) => {
        let token = response.token;
        let id = response.id

        if (!token || !id) {
          await LoginService.logout(this.router)
        }

        if (response.role == 'driver') {
          await this.loginService.setCredentials(token, id)
          await this.router.navigate(['/driver-profile']);
        } else if (response.role == 'manager') {
          await this.loginService.setCredentials(token, id)
          await this.router.navigate(['/manager-profile']);
        } else if (response.role == 'admin') {
          await this.loginService.setCredentials(token, id)
          await this.router.navigate(['/admin-profile']);
        } else {
          await this.router.navigate(['/login']);
        }
      },
      (error) => {
        if (this.loginService.errorMessage != "") {
          UtilService.showError(this.loginService.errorMessage)
        }
      }
    );
  }
}
