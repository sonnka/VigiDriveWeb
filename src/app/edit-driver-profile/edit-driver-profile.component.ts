import {Component} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {Router} from "@angular/router";
import {DriverResponse} from "../_models/driver.response";
import {LoginService} from "../_services/login.service";
import {AppComponent} from "../app.component";
import {DriverRequest} from "../_models/driver.request";
import {DriverLicenseRequest} from "../_models/driver-license.request";

@Component({
  selector: 'app-edit-driver-profile',
  templateUrl: './edit-driver-profile.component.html',
  styleUrl: './edit-driver-profile.component.css'
})
export class EditDriverProfileComponent {

  protected driverResponse: DriverResponse | undefined;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.getDriver();
  }

  protected async updateProfile(avatar: string, firstName: string, lastName: string, dateOfBirth: string, phone: string,
                                number: string, dateTo: string) {
    console.log(avatar + " | " + firstName + " | " + lastName + " | " + dateOfBirth + " | " + phone +
      " | " + number + " | " + dateTo);
    await this.updateDriver(new DriverRequest(avatar, firstName, lastName, dateOfBirth, phone))
    await this.updateDriverLicense(new DriverLicenseRequest(number, dateTo))
    this.router.navigate(['/driver-profile']);
  }

  private getDriver() {
    this.driverService.getDriver()
      .subscribe(response => {
          this.driverResponse = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private async updateDriver(driverRequest: DriverRequest) {
    try {
      this.driverResponse = await this.driverService.updateDriver(driverRequest).toPromise();
    } catch (error) {
      this.displayError(error)
    }
  }

  private async updateDriverLicense(driverLicenseRequest: DriverLicenseRequest) {
    try {
      await this.driverService.updateDriverLicense(driverLicenseRequest).toPromise()
    } catch (error) {
      this.displayError(error)
    }
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout()
      this.router.navigate(['/login']);
    }
    if (error.error != null) {
      console.log(error.error)
      AppComponent.showError(error.error.errorMessage)
    } else {
      console.log(error)
      AppComponent.showError(error.message)
    }
  }
}
