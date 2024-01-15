import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {LoginRequest} from "../_models/login.request";
import {Router} from "@angular/router";

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
    this.loginService.login(data).subscribe(response => {
      console.log(response);
    });
    this.router.navigate(['/driver-profile']);
  }
}
