import {Component} from '@angular/core';
import {ManagerService} from "../_services/manager.service";
import {Router} from "@angular/router";
import {DriverResponse} from "../_models/driver.response";
import {DriverService} from "../_services/driver.service";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {AppComponent} from "../app.component";
import {UtilService} from "../_services/util.service";
import {LoginService} from "../_services/login.service";

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrl: './driver-info.component.css'
})
export class DriverInfoComponent {

  protected driverInfoResponse: DriverResponse | undefined;
  protected healthInfo: HealthInfoResponse | undefined;
  protected weekSituations: SituationResponse[] | undefined;
  protected readonly AppComponent = AppComponent;
  protected startOfCurrentWeek = '00.00.0000'
  protected endOfCurrentWeek = '00.00.0000'
  protected readonly UtilService = UtilService;
  private driverId: string | undefined;

  constructor(private managerService: ManagerService, private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.driverId = history.state.driverId;
    if (this.driverId == null) {
      this.router.navigate(['/manager-profile']);
    }

    let date = new Date()
    date.setDate(date.getDate() - date.getDay() + 1)
    this.startOfCurrentWeek = AppComponent.formatDate(date) || '00.00.0000';
    date.setDate(date.getDate() + 6)
    this.endOfCurrentWeek = AppComponent.formatDate(date) || '00.00.0000';

    this.getDriverInfo();
    this.getDriverHealthInfo();
    this.getWeekSituations();
  }

  private getDriverInfo(): void {
    this.managerService.getDriverInfo(this.driverId!).subscribe(response => {
        this.driverInfoResponse = response;
      },
      (error) => {
        if (error.status == 401) {
          LoginService.logout()
          this.router.navigate(['/login']);
        }
        AppComponent.showError(error.message)
      })
  }

  private getDriverHealthInfo() {
    this.driverService.getDriverHealthInfo(this.driverId!).subscribe(response => {
        this.healthInfo = response;
      },
      (error) => {
        if (error.status == 401) {
          LoginService.logout()
          this.router.navigate(['/login']);
        }
        AppComponent.showError(error.message)
      })
  }

  private getWeekSituations() {
    this.driverService.getDriverSituationInfo(this.driverId!).subscribe(response => {
        this.weekSituations = response;
      },
      (error) => {
        if (error.status == 401) {
          LoginService.logout()
          this.router.navigate(['/login']);
        }
        AppComponent.showError(error.message)
      })
  }
}
