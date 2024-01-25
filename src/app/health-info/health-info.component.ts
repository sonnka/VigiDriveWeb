import {Component} from '@angular/core';
import {HealthInfoResponse} from "../_models/health-info.response";
import {DriverService} from "../_services/driver.service";
import {DriverProfileComponent} from "../driver-profile/driver-profile.component";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrl: './health-info.component.css'
})
export class HealthInfoComponent {

  healthInfo: HealthInfoResponse | undefined;
  protected readonly DriverProfileComponent = DriverProfileComponent;
  protected readonly AppComponent = AppComponent;

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.getHealthInfo();
  }

  private getHealthInfo() {
    this.driverService.getHealthInfo()
      .subscribe(response => {
        this.healthInfo = response;
        console.log('Health info: ' + JSON.stringify(response));
      });
  }
}
