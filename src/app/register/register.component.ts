import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {ManagerService} from "../_services/manager.service";
import {RegisterRequest} from "../_models/register.request";
import {Router} from "@angular/router";

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
      console.log(response);
    });
    this.router.navigate(['/login']);
  }

  registerManager(firstName: string, lastName: string, email: string, password: string): void {
    let data = new RegisterRequest(firstName, lastName, email, password);
    this.managerService.register(data).subscribe(response => {
      console.log(response);
    });
    this.router.navigate(['/login']);
  }
}
