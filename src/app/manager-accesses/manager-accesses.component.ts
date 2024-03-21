import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ManagerService} from "../_services/manager.service";
import {AccessDto} from "../_models/response/access.dto";
import {AccessRequest} from "../_models/request/access.request";
import {UtilService} from "../_services/util.service";
import {AccessDuration} from "../_models/response/access.duration";

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

  constructor(private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    this.getSentAccesses();
    this.getActiveAccesses();
    this.getInactiveAccesses();
  }

  protected requestAccess(driverEmail: string, duration: string) {
    this.managerService.requestAccess(new AccessRequest(driverEmail, duration)).then((r) => {
      r.subscribe(() => {
        location.reload();
      }, (error) => {
        UtilService.displayError(error, this.router)
      });
    })
  }

  protected extendAccess(accessId: bigint) {
    let duration = (document.getElementById("duration") as HTMLInputElement).value;
    if (duration) {
      this.managerService.extendAccess(accessId, new AccessDuration(duration)).then((r) => {
        r.subscribe(() => {
          location.reload();
        }, (error) => {
          UtilService.displayError(error, this.router)
        });
      })
    }
  }

  protected openFormAccess() {
    document.getElementById("myForm")!.style.display = "block";
  }

  protected closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }

  private getSentAccesses() {
    this.managerService.getSentAccesses().then((r) => {
      r.subscribe(response => {
          this.sentAccesses = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private getActiveAccesses() {
    this.managerService.getActiveAccesses().then((r) => {
      r.subscribe(response => {
          this.activeAccesses = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private getInactiveAccesses() {
    this.managerService.getInactiveAccesses().then((r) => {
      r.subscribe(response => {
          this.inactiveAccesses = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

}
