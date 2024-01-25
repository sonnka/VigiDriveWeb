import {Component} from '@angular/core';
import {LoginService} from "./_services/login.service";
import {formatDate} from "@angular/common";

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

  public static formatDate(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return formatDate(date, 'dd.MM.YYYY', 'en-US');
  }

  public static formatDateTime(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return formatDate(date, 'dd.MM.YYYY hh:mm', 'en-US');
  }

  public static formatLicenseDate(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return formatDate(date, 'MM/YY', 'en-US');
  }
}
