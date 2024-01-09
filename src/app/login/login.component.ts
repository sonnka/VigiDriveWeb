import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {LoginRequest} from "../_models/login.request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService) {
  }

  login(email: string, password: string): void {
    let data = new LoginRequest(email, password);
    let token = '';
    this.loginService.login(data).subscribe(response => {
      token = response;
    });
    console.log(token);
  }
}
