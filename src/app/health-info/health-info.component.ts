import {Component} from '@angular/core';
import {HealthInfoResponse} from "../_models/health-info.response";
import {DriverService} from "../_services/driver.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrl: './health-info.component.css'
})
export class HealthInfoComponent {

  driverId: bigint | undefined;
  token: string | undefined;
  healthInfo: HealthInfoResponse | undefined;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.driverId = history.state.id;
    this.token = history.state.token;
    this.getHealthInfo();
  }


  private getHealthInfo() {
    this.driverService.getHealthInfo(this.driverId, this.token)
      .subscribe(response => {
        this.healthInfo = response;
        console.log('Health info: ' + JSON.stringify(response));
      });
  }
}
