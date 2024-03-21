import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {Router} from "@angular/router";
import {DriverResponse} from "../_models/response/driver.response";
import {LoginService} from "../_services/login.service";
import {DriverRequest} from "../_models/request/driver.request";
import {DriverLicenseRequest} from "../_models/request/driver-license.request";
import {ManagerRequest} from "../_models/request/manager.request";
import {ManagerResponse} from "../_models/response/manager.response";
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
    if (firstName && lastName && dateOfBirth && phone) {
      await this.updateDriver(new DriverRequest(avatar, firstName, lastName, dateOfBirth, phone))
    }
    if (number && dateTo) {
      await this.updateDriverLicense(new DriverLicenseRequest(number, dateTo))
    }
    if (emergencyContact) {
      await this.updateEmergencyContact(emergencyContact);
    }
    await this.router.navigate(['/driver-profile']);
  }

  protected async updateManagerProfile(avatar: string, firstName: string, lastName: string) {
    if (firstName && lastName) {
      await this.updateManager(new ManagerRequest(avatar, firstName, lastName))
    }
    await this.router.navigate(['/manager-profile']);
  }

  private getManager() {
    this.managerService.getManager().then((r) => {
      r.subscribe(response => {
          this.managerResponse = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private async updateManager(managerRequest: ManagerRequest) {
    try {
      await this.managerService.updateManager(managerRequest);
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private async updateEmergencyContact(emergencyContact: string) {
    try {
      await this.driverService.updateEmergencyContact(emergencyContact);
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private getDriver() {
    this.driverService.getDriver().then((r) => {
      r.subscribe(response => {
          this.driverResponse = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private async updateDriver(driverRequest: DriverRequest) {
    try {
      await this.driverService.updateDriver(driverRequest);
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private async updateDriverLicense(driverLicenseRequest: DriverLicenseRequest) {
    try {
      await this.driverService.updateDriverLicense(driverLicenseRequest)
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

}
