import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {DriverService} from "../_services/driver.service";

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent {
  constructor(private driverService: DriverService, private router: Router) {
  }

  getDriverProfile() {
    this.getDriver();
    this.getHealthInfo();
    this.getSituationInfo();
  }

  private getDriver() {
    // this.driverService.getDriver();
  }

  private getHealthInfo() {
    //this.driverService.getHealthInfo();
  }

  private getSituationInfo() {
    //this.driverService.getSituationInfo();
  }
}
