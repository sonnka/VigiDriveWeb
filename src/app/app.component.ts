import {Component} from '@angular/core';
import {LoginService} from "./_services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly LoginService = LoginService;

  constructor(private router: Router) {
  }

  protected async logout() {
    await LoginService.logout(this.router)
  }
}
