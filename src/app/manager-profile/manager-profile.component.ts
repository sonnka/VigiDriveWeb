import {Component} from '@angular/core';
import {ManagerService} from "../_services/manager.service";
import {ManagerResponse} from "../_models/manager.response";
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

  private getManagerProfile() {
    this.managerService.getManager().then((r) => {
      r.subscribe(response => {
        this.managerResponse = response;
      }, (error) => {
        if (error.status == 401) {
          LoginService.logout(this.router)
        }
        if (error.error != null) {
          UtilService.showError(error.error.errorMessage)
        } else {
          UtilService.showError(error.message)
        }
      });
    })
  }
}
