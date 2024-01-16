import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DriverService} from "../_services/driver.service";

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent implements OnInit {

  private driverId = -1n;
  private token = '';

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.driverId = history.state.id;
    this.token = history.state.token;
    this.getDriverProfile();
  }

  getDriverProfile() {
    this.getDriver();
    this.getHealthInfo();
    this.getSituationInfo();
  }

  private getDriver() {
    this.driverService.getDriver(this.driverId, this.token)
      .subscribe(response =>
        console.log('Response: ' + JSON.stringify(response)));
  }

  private getHealthInfo() {
    this.driverService.getHealthInfo(this.driverId, this.token);
  }

  private getSituationInfo() {
    this.driverService.getSituationInfo(this.driverId, this.token);
  }
}
