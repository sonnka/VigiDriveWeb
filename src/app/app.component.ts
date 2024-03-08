import {Component} from '@angular/core';
import {LoginService} from "./_services/login.service";
import {DatePipe, formatDate} from "@angular/common";
import getUserLocale from "get-user-locale";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  static formatter = new DatePipe(getUserLocale(), Intl.DateTimeFormat().resolvedOptions().timeZone);
  title = 'VigiDriveWeb';
  login = 'Login';
  register = 'Register';
  protected readonly LoginService = LoginService;

  public static formatDate(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return this.formatter.transform(date, "mediumDate");
  }

  public static formatDateTime(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return this.formatter.transform(date, "dd.MM.YYYY HH:mm");
  }

  public static formatFullDateTime(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return this.formatter.transform(date, "HH:mm:ss, dd.MM.YYYY");
  }

  public static formatLicenseDate(date: Date | undefined): string | null {
    if (date == null) {
      return null;
    }
    return formatDate(date, 'MM/YY', 'en-US');
  }

  public static showError(message: string) {
    let div = document.getElementById("alert");
    div!.textContent = message
    div!.style.display = "block";
    setTimeout(function () {
      div!.style.opacity = "0";
      div!.style.display = "none";
    }, 6000);
  }
}
