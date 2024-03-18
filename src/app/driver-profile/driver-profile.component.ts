import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {DriverResponse} from "../_models/driver.response";
import {HealthInfoResponse} from "../_models/health-info.response";
import {SituationResponse} from "../_models/situation.response";
import {UtilService} from "../_services/util.service";
import {LoginService} from "../_services/login.service";
import {Router} from "@angular/router";

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
  protected readonly UtilService = UtilService;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.getDriver();
    this.getHealthInfo();
    this.getSituationInfo();
  }

  protected showPopup() {
    document.getElementById("popup")!.style.display = "flex";
  }

  protected hidePopup() {
    document.getElementById("popup")!.style.display = "none";
  }

  protected async deleteProfile() {
    document.getElementById("popup")!.style.display = "none";
    try {
      await this.driverService.deleteDriver()
      await LoginService.logout(this.router)
    } catch (error) {
      this.displayError(error)
    }
  }

  private getDriver() {
    this.driverService.getDriver().then((r) => {
      r.subscribe(response => {
          this.driverResponse = response;
        },
        (error) => {
          this.displayError(error)
        });
    })
  }

  private getHealthInfo() {
    this.driverService.getHealthInfo().then((r) => {
      r.subscribe(response => {
          this.healthInfo = response;
        },
        (error) => {
          this.displayError(error)
        });
    })
  }

  private getSituationInfo() {
    this.driverService.getSituationInfo().then((r) => {
      r.subscribe(response => {
          this.situations = response;

          let monday = this.getMonday();
          let sunday = new Date();
          let day = sunday.getDay();

          sunday.setDate(sunday.getDate() + (7 - day));

          if (monday != null && sunday != null) {
            this.situationPeriod = UtilService.formatDate(monday) + ' - ' + UtilService.formatDate(sunday);
          }
        },
        (error) => {
          this.displayError(error)
        });
    })
  }

  private getMonday() {
    let today = new Date();
    let day = today.getDay();
    today.setDate(today.getDate() - day + 1)
    return today;
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout(this.router)
    }
    if (error.error) {
      UtilService.showError(error.message)
    } else if (error.message) {
      UtilService.showError(error.error.errorMessage)
    } else {
      UtilService.showError("Something went wrong!")
    }
  }
}
