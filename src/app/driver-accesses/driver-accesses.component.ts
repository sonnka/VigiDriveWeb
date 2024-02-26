import {Component} from '@angular/core';
import {UtilService} from "../_services/util.service";
import {DriverService} from "../_services/driver.service";
import {ManagerDto} from "../_models/manager.dto";
import {AccessDto} from "../_models/access.dto";
import {AppComponent} from "../app.component";
import {LoginService} from "../_services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-accesses',
  templateUrl: './driver-accesses.component.html',
  styleUrl: './driver-accesses.component.css'
})
export class DriverAccessesComponent {

  protected readonly UtilService = UtilService;
  protected managerResponse: ManagerDto | undefined;
  protected accessResponse: AccessDto | undefined;
  protected accessRequests: AccessDto[] | undefined;
  protected activeAccesses: AccessDto[] | undefined;
  protected inactiveAccesses: AccessDto[] | undefined;
  protected readonly AppComponent = AppComponent;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.getManager();
    this.getAccessRequests();
    this.getActiveAccesses();
    this.getInactiveAccesses();
  }

  protected isManager() {
    return this.managerResponse != null;
  }

  protected getAccess(accessId: bigint) {
    this.driverService.getAccess(accessId)
      .subscribe(response => {
          this.accessResponse = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  protected giveAccess(accessId: bigint) {
    this.driverService.giveAccess(accessId).subscribe(() => {
      location.reload();
    }, (error) => {
      this.displayError(error)
    });
  }

  protected stopAccess(accessId: bigint) {
    this.driverService.stopAccess(accessId).subscribe(() => {
      location.reload();
    }, (error) => {
      this.displayError(error)
    });
  }

  private getManager() {
    this.driverService.getManager()
      .subscribe(response => {
          this.managerResponse = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private getAccessRequests() {
    this.driverService.getAccessRequests()
      .subscribe(response => {
          this.accessRequests = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private getActiveAccesses() {
    this.driverService.getActiveAccesses()
      .subscribe(response => {
          this.activeAccesses = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private getInactiveAccesses() {
    this.driverService.getInactiveAccesses()
      .subscribe(response => {
          this.inactiveAccesses = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout()
      this.router.navigate(['/login']);
    }
    if (error.error != null) {
      AppComponent.showError(error.error.errorMessage)
    } else {
      AppComponent.showError(error.message)
    }
  }
}
