import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {ManagerService} from "../_services/manager.service";
import {RegisterRequest} from "../_models/register.request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private driverService: DriverService, private managerService: ManagerService) {
  }

  registerDriver(firstName: string, lastName: string, email: string, password: string, avatar: string): void {
    let data = new RegisterRequest(firstName, lastName, email, password, avatar);
    this.driverService.register(data).subscribe(response => {
      console.log(response);
    });
  }

  registerManager(firstName: string, lastName: string, email: string, password: string, avatar: string): void {
    let data = new RegisterRequest(firstName, lastName, email, password, avatar);
    this.managerService.register(data).subscribe(response => {
      console.log(response);
    });
  }
}
