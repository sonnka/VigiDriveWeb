import {Component} from '@angular/core';
import {UtilService} from "../_services/util.service";
import {DriverService} from "../_services/driver.service";
import {ManagerDto} from "../_models/response/manager.dto";
import {AccessDto} from "../_models/response/access.dto";
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
    this.driverService.getAccess(accessId).then((r) => {
      r.subscribe(response => {
          this.accessResponse = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  protected giveAccess(accessId: bigint) {
    this.driverService.giveAccess(accessId).then((r) => {
      r.subscribe(() => {
        location.reload();
      }, (error) => {
        UtilService.displayError(error, this.router)
      });
    })
  }

  protected stopAccess(accessId: bigint) {
    this.driverService.stopAccess(accessId).then((r) => {
      r.subscribe(() => {
        location.reload();
      }, (error) => {
        UtilService.displayError(error, this.router)
      });
    })
  }

  private getManager() {
    this.driverService.getManager().then((r) => {
      r.subscribe(response => {
          this.managerResponse = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private getAccessRequests() {
    this.driverService.getAccessRequests().then((r) => {
      r.subscribe(response => {
          this.accessRequests = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private getActiveAccesses() {
    this.driverService.getActiveAccesses().then((r) => {
      r.subscribe(response => {
          this.activeAccesses = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }

  private getInactiveAccesses() {
    this.driverService.getInactiveAccesses().then((r) => {
      r.subscribe(response => {
          this.inactiveAccesses = response;
        },
        (error) => {
          UtilService.displayError(error, this.router)
        });
    })
  }
}
