import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DriverService} from "../_services/driver.service";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent implements OnInit {

  driverId: bigint | undefined;
  token: string | undefined;
  driverResponse: DriverResponse | undefined;
  healthInfo: HealthInfoResponse | undefined;

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
      .subscribe(response => {
        this.driverResponse = response;
        console.log('Driver: ' + JSON.stringify(response));
      });
  }

  private getHealthInfo() {
    this.driverService.getHealthInfo(this.driverId, this.token)
      .subscribe(response => {
        this.healthInfo = response;
        console.log('Health info: ' + JSON.stringify(response));
      });
  }

  private getSituationInfo() {
    this.driverService.getSituationInfo(this.driverId, this.token);
  }
}
