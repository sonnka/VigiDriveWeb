import {Component} from '@angular/core';
import {LoginService} from "./_services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VigiDriveWeb';
  login = 'Login';
  register = 'Register';
  home = 'Home';
  protected readonly LoginService = LoginService;
}
