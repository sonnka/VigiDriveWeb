import {Component} from '@angular/core';
import {ManagerService} from "../_services/manager.service";
import {ManagerResponse} from "../_models/manager.response";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {

  protected managerResponse: ManagerResponse | undefined;
  protected readonly AppComponent = AppComponent;

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
          LoginService.logout()
          this.router.navigate(['/login']);
        }
        if (error.error != null) {
          AppComponent.showError(error.error.errorMessage)
        } else {
          AppComponent.showError(error.message)
        }
      });
    })
  }
}
