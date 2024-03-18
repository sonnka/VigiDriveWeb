import {Component} from '@angular/core';
import {ManagerService} from "../_services/manager.service";
import {Router} from "@angular/router";
import {DriverResponse} from "../_models/response/driver.response";
import {DriverService} from "../_services/driver.service";
import {HealthInfoResponse} from "../_models/response/health-info.response";
import {SituationResponse} from "../_models/response/situation.response";
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
    this.startOfCurrentWeek = UtilService.formatDate(date) || '00.00.0000';
    date.setDate(date.getDate() + 6)
    this.endOfCurrentWeek = UtilService.formatDate(date) || '00.00.0000';

    this.getDriverInfo();
    this.getDriverHealthInfo();
    this.getWeekSituations();
  }

  protected async setDestination(destination: string) {
    try {
      await this.managerService.updateDestination(this.driverId!, destination)
    } catch (error) {
      this.displayError(error)
    }
  }

  protected async generateGeneralReport() {
    try {
      await this.managerService.generateGeneralReport(this.driverId!).then(res => {
          res.subscribe(
            response => {
              const file = new Blob([response], {type: "application/pdf"});
              const fileUrl = URL.createObjectURL(file);
              window.open(fileUrl);
            },
            error => {
              this.displayError(error)
            }
          )
        }
      )
    } catch (error) {
      this.displayError(error);
    }
  }

  protected async generateHealthReport() {
    try {
      await this.managerService.generateHealthReport(this.driverId!).then(res => {
        res.subscribe(
          response => {
            const file = new Blob([response], {type: "application/pdf"});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          },
          error => {
            this.displayError(error)
          })
      })
    } catch (error) {
      this.displayError(error)
    }
  }

  protected async generateSituationReport() {
    try {
      await this.managerService.generateSituationReport(this.driverId!).then(res => {
        res.subscribe(
          response => {
            const file = new Blob([response], {type: "application/pdf"});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          },
          error => {
            this.displayError(error)
          })
      })
    } catch (error) {
      this.displayError(error)
    }
  }


  private getDriverInfo(): void {
    this.managerService.getDriverInfo(this.driverId!).then((r) => {
      r.subscribe(response => {
          this.driverInfoResponse = response;
        },
        (error) => {
          this.displayError(error)
        })
    })
  }

  private getDriverHealthInfo() {
    this.driverService.getDriverHealthInfo(this.driverId!).then((r) => {
      r.subscribe(response => {
          this.healthInfo = response;
        },
        (error) => {
          this.displayError(error)
        })
    })
  }

  private getWeekSituations() {
    this.driverService.getDriverSituationInfo(this.driverId!).then((r) => {
      r.subscribe(response => {
          this.weekSituations = response;
        },
        (error) => {
          this.displayError(error)
        })
    })
  }

  private displayError(error: any) {
    console.log(error)
    if (error.status == 401) {
      LoginService.logout(this.router)
    }
    if (error.message != null) {
      UtilService.showError(error.message)
    } else if (error.error != null) {
      UtilService.showError(error.error.errorMessage)
    } else {
      UtilService.showError("Something went wrong!")
    }
  }
}
