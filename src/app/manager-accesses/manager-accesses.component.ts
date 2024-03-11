import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {Router} from "@angular/router";
import {ManagerService} from "../_services/manager.service";
import {AppComponent} from "../app.component";
import {AccessDto} from "../_models/access.dto";
import {AccessRequest} from "../_models/access.request";
import {UtilService} from "../_services/util.service";
import {AccessDuration} from "../_models/access.duration";

@Component({
  selector: 'app-manager-accesses',
  templateUrl: './manager-accesses.component.html',
  styleUrl: './manager-accesses.component.css'
})
export class ManagerAccessesComponent {

  protected sentAccesses: AccessDto[] | undefined;
  protected activeAccesses: AccessDto[] | undefined;
  protected inactiveAccesses: AccessDto[] | undefined;
  protected readonly UtilService = UtilService;
  protected readonly AppComponent = AppComponent;

  constructor(private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    this.getSentAccesses();
    this.getActiveAccesses();
    this.getInactiveAccesses();
  }

  protected requestAccess(driverEmail: string, duration: string) {
    this.managerService.requestAccess(new AccessRequest(driverEmail, duration)).subscribe(() => {
      location.reload();
    }, (error) => {
      this.displayError(error)
    });
  }

  protected extendAccess(accessId: bigint) {
    let duration = (document.getElementById("duration") as HTMLInputElement).value;
    console.log(duration)
    if (duration != "") {
      this.managerService.extendAccess(accessId, new AccessDuration(duration)).subscribe(() => {
        location.reload();
      }, (error) => {
        this.displayError(error)
      });
    }
  }

  protected openFormAccess() {
    document.getElementById("myForm")!.style.display = "block";
  }

  protected closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }

  private getSentAccesses() {
    this.managerService.getSentAccesses()
      .subscribe(response => {
          this.sentAccesses = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private getActiveAccesses() {
    this.managerService.getActiveAccesses()
      .subscribe(response => {
          this.activeAccesses = response;
        },
        (error) => {
          this.displayError(error)
        });
  }

  private getInactiveAccesses() {
    this.managerService.getInactiveAccesses()
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
      console.log(error.error)
      AppComponent.showError(error.error.errorMessage)
    } else {
      console.log(error.message)
      AppComponent.showError(error.message)
    }
  }
}
