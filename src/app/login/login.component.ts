import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {LoginRequest} from "../_models/login.request";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

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

    this.loginService.login(data).subscribe((response) => {
        let token = response.token;
        if (response.role == 'driver') {
          this.loginService.setToken(token)
          this.router.navigate(['/driver-profile']);
        } else if (response.role == 'manager') {
          this.loginService.setToken(token)
          this.router.navigate(['/manager-profile']);
        } else if (response.role == 'admin') {
          this.loginService.setToken(token)
          this.router.navigate(['/admin-profile']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        if (this.loginService.errorMessage != "") {
          AppComponent.showError(this.loginService.errorMessage)
        }
      }
    );
  }
}
