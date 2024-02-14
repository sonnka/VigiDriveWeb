import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {Router} from "@angular/router";
import {ManagerService} from "../_services/manager.service";
import {AppComponent} from "../app.component";
import {AccessDto} from "../_models/access.dto";
import {AccessDuration} from "../_models/access.duration";
import {AccessRequest} from "../_models/access.request";

@Component({
  selector: 'app-manager-accesses',
  templateUrl: './manager-accesses.component.html',
  styleUrl: './manager-accesses.component.css'
})
export class ManagerAccessesComponent {

  protected accessRequests: AccessDto[] | undefined;
  protected activeAccesses: AccessDto[] | undefined;
  protected inactiveAccesses: AccessDto[] | undefined;

  constructor(private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    this.getSentAccesses();
    this.getActiveAccesses();
    this.getInactiveAccesses();
  }

  protected requestAccess(accessId: bigint, accessRequest: AccessRequest) {
    this.managerService.requestAccess(accessId, accessRequest).subscribe(() => {
    }, (error) => {
      if (error.status == 401) {
        LoginService.logout()
        this.router.navigate(['/login']);
      }
      AppComponent.showError(error.message)
    });
  }

  protected extendAccess(accessId: bigint, accessDuration: AccessDuration) {
    this.managerService.extendAccess(accessId, accessDuration).subscribe(() => {
    }, (error) => {
      if (error.status == 401) {
        LoginService.logout()
        this.router.navigate(['/login']);
      }
      AppComponent.showError(error.message)
    });
  }

  private getSentAccesses() {
    this.managerService.getSentAccesses()
      .subscribe(response => {
          this.accessRequests = response;
        },
        (error) => {
          if (error.status == 401) {
            LoginService.logout()
            this.router.navigate(['/login']);
          }
          AppComponent.showError(error.message)
        });
  }

  private getActiveAccesses() {
    this.managerService.getActiveAccesses()
      .subscribe(response => {
          this.activeAccesses = response;
        },
        (error) => {
          if (error.status == 401) {
            LoginService.logout()
            this.router.navigate(['/login']);
          }
          AppComponent.showError(error.message)
        });
  }

  private getInactiveAccesses() {
    this.managerService.getInactiveAccesses()
      .subscribe(response => {
          this.inactiveAccesses = response;
        },
        (error) => {
          if (error.status == 401) {
            LoginService.logout()
            this.router.navigate(['/login']);
          }
          AppComponent.showError(error.message)
        });
  }
}
