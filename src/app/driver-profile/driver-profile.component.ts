import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {AppComponent} from "../app.component";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent {

  driverResponse: DriverResponse | undefined;
  healthInfo: HealthInfoResponse | undefined;
  situations: SituationResponse[] | undefined;
  situationPeriod: string | undefined;
  protected readonly AppComponent = AppComponent;
  protected readonly UtilService = UtilService;

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.getDriver();
    this.getHealthInfo();
    this.getSituationInfo();
  }

  private getDriver() {
    this.driverService.getDriver()
      .subscribe(response => {
        this.driverResponse = response;
        console.log('Driver: ' + JSON.stringify(response));
      });
  }

  private getHealthInfo() {
    this.driverService.getHealthInfo()
      .subscribe(response => {
        this.healthInfo = response;
        console.log('Health info: ' + JSON.stringify(response));
      });
  }

  private getSituationInfo() {
    this.driverService.getSituationInfo()
      .subscribe(response => {
        this.situations = response;

        let monday = this.getMonday();
        let sunday = new Date();
        let day = sunday.getDay();

        sunday.setDate(sunday.getDate() + (7 - day));

        if (monday != null && sunday != null) {
          this.situationPeriod = AppComponent.formatDate(monday) + ' - ' + AppComponent.formatDate(sunday);
        }

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
