import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {ManagerService} from "../_services/manager.service";
import {RegisterRequest} from "../_models/register.request";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private driverService: DriverService, private managerService: ManagerService, private router: Router) {
  }

  registerDriver(firstName: string, lastName: string, email: string, password: string): void {
    let data = new RegisterRequest(firstName, lastName, email, password);
    this.driverService.register(data).subscribe(response => {
      },
      (error) => {
        this.displayError(error)
      });
    this.router.navigate(['/login']);
  }

  registerManager(firstName: string, lastName: string, email: string, password: string): void {
    let data = new RegisterRequest(firstName, lastName, email, password);
    this.managerService.register(data).subscribe(response => {
      },
      (error) => {
        this.displayError(error)
      });
    this.router.navigate(['/login']);
  }

  private displayError(error: any) {
    if (error.error != null) {
      AppComponent.showError(error.error.errorMessage)
    } else {
      AppComponent.showError(error.message)
    }
  }
}
