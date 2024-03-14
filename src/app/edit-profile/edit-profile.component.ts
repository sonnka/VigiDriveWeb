import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {Router} from "@angular/router";
import {DriverResponse} from "../_models/driver.response";
import {LoginService} from "../_services/login.service";
import {DriverRequest} from "../_models/driver.request";
import {DriverLicenseRequest} from "../_models/driver-license.request";
import {ManagerRequest} from "../_models/manager.request";
import {ManagerResponse} from "../_models/manager.response";
import {ManagerService} from "../_services/manager.service";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  protected driverResponse: DriverResponse | undefined;
  protected managerResponse: ManagerResponse | undefined;
  protected readonly LoginService = LoginService;

  constructor(private driverService: DriverService, private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    if (LoginService.isDriver()) {
      this.getDriver();
    } else if (LoginService.isManager()) {
      this.getManager();
    } else {
      LoginService.logout(this.router)
    }
  }

  protected async updateDriverProfile(avatar: string, firstName: string, lastName: string, dateOfBirth: string, phone: string,
                                      number: string, dateTo: string, emergencyContact: string) {
    await this.updateDriver(new DriverRequest(avatar, firstName, lastName, dateOfBirth, phone))
    await this.updateDriverLicense(new DriverLicenseRequest(number, dateTo))
    await this.updateEmergencyContact(emergencyContact);
    await this.router.navigate(['/driver-profile']);
  }

  protected async updateManagerProfile(avatar: string, firstName: string, lastName: string) {
    await this.updateManager(new ManagerRequest(avatar, firstName, lastName))
    await this.router.navigate(['/manager-profile']);
  }

  private getManager() {
    this.managerService.getManager().then((r) => {
      r.subscribe(response => {
          this.managerResponse = response;
        },
        (error) => {
          this.displayError(error)
        });
    })
  }

  private async updateManager(managerRequest: ManagerRequest) {
    try {
      await this.managerService.updateManager(managerRequest);
    } catch (error) {
      this.displayError(error)
    }
  }

  private async updateEmergencyContact(emergencyContact: string) {
    try {
      await this.driverService.updateEmergencyContact(emergencyContact);
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

  private async updateDriver(driverRequest: DriverRequest) {
    try {
      await this.driverService.updateDriver(driverRequest);
    } catch (error) {
      this.displayError(error)
    }
  }

  private async updateDriverLicense(driverLicenseRequest: DriverLicenseRequest) {
    try {
      await this.driverService.updateDriverLicense(driverLicenseRequest)
    } catch (error) {
      this.displayError(error)
    }
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout(this.router)
    }
    if (error.error != null) {
      UtilService.showError(error.error.errorMessage)
    } else {
      UtilService.showError(error.message)
    }
  }
}
