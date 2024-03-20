import {Component} from '@angular/core';
import {ManagerService} from "../_services/manager.service";
import {ManagerResponse} from "../_models/response/manager.response";
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {

  protected managerResponse: ManagerResponse | undefined;

  constructor(private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    this.getManagerProfile();
  }

  protected getDriverInfo(driverId: bigint) {
    this.router.navigate(['/driver-info'], {state: {driverId: driverId}});
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
      await this.managerService.deleteManager()
      await LoginService.logout(this.router)
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private getManagerProfile() {
    this.managerService.getManager().then((r) => {
      r.subscribe(response => {
        this.managerResponse = response;
      }, (error) => {
        UtilService.displayError(error, this.router)
      });
    })
  }

}
