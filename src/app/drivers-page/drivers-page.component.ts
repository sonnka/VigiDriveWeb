import {Component} from '@angular/core';
import {UtilService} from "../_services/util.service";
import {AdminService} from "../_services/admin.service";
import {Router} from "@angular/router";
import {DriverDto} from "../_models/response/driver.dto";

@Component({
  selector: 'app-drivers-page',
  templateUrl: './drivers-page.component.html',
  styleUrl: './drivers-page.component.css'
})
export class DriversPageComponent {

  protected readonly UtilService = UtilService;
  protected drivers: DriverDto[] | undefined;
  private driverId: bigint | undefined;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
    this.getDrivers();
  }

  protected showPopup(driverId: bigint) {
    this.driverId = driverId;
    document.getElementById("popup")!.style.display = "flex";
  }

  protected hidePopup() {
    document.getElementById("popup")!.style.display = "none";
  }

  protected async deleteDriver() {
    try {
      await this.adminService.deleteDriver(this.driverId!);
      location.reload();
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private async getDrivers() {
    try {
      this.drivers = await this.adminService.getDrivers();
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }
}
