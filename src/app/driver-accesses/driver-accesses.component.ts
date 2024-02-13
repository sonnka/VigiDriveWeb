import {Component} from '@angular/core';
import {UtilService} from "../_services/util.service";
import {DriverService} from "../_services/driver.service";
import {ManagerDto} from "../_models/manager.dto";
import {AccessDto} from "../_models/access.dto";

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

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.getManager();
    this.getAccessRequests();
    this.getActiveAccesses();
    this.getInactiveAccesses();
  }

  private getManager() {
    this.driverService.getManager()
      .subscribe(response => {
        this.managerResponse = response;
      });
  }

  private getAccess(accessId: string) {
    this.driverService.getAccess(accessId)
      .subscribe(response => {
        this.accessResponse = response;
      });
  }

  private getAccessRequests() {
    this.driverService.getAccessRequests()
      .subscribe(response => {
        this.accessRequests = response;
      });
  }

  private getActiveAccesses() {
    this.driverService.getActiveAccesses()
      .subscribe(response => {
        this.activeAccesses = response;
      });
  }

  private getInactiveAccesses() {
    this.driverService.getInactiveAccesses()
      .subscribe(response => {
        this.inactiveAccesses = response;
      });
  }
}
