import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DriverService} from "../_services/driver.service";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {formatDate} from "@angular/common";

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
  situations: SituationResponse[] | undefined;
  situationPeriod: string | undefined;

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

  public formatDate(date: Date): string {
    return formatDate(date, 'dd.MM.YYYY', 'en-US');
  }

  public formatDateTime(date: Date): string {
    return formatDate(date, 'dd.MM.YYYY hh:mm', 'en-US');
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
    this.driverService.getSituationInfo(this.driverId, this.token)
      .subscribe(response => {
        this.situations = response;
        let monday = this.getMonday();
        let sunday = new Date();
        let day = sunday.getDay();
        sunday.setDate(sunday.getDate() + (7 - day));
        this.situationPeriod = this.formatDate(monday) + ' - ' + this.formatDate(sunday);
        console.log('Situations: ' + JSON.stringify(response));
      });
  }

  private getMonday() {
    let today = new Date();
    let day = today.getDay();
    today.setDate(today.getDate() - day + 1)
    return today;
  }
}
