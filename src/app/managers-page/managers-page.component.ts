import {Component} from '@angular/core';
import {AdminService} from "../_services/admin.service";
import {Router} from "@angular/router";
import {ManagerDto} from "../_models/response/manager.dto";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-managers-page',
  templateUrl: './managers-page.component.html',
  styleUrl: './managers-page.component.css'
})
export class ManagersPageComponent {

  protected managers: ManagerDto[] | undefined;
  protected readonly UtilService = UtilService;
  private managerId: bigint | undefined;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
    this.getManagers();
  }

  protected showPopup(managerId: bigint) {
    this.managerId = managerId;
    document.getElementById("popup")!.style.display = "flex";
  }

  protected hidePopup() {
    document.getElementById("popup")!.style.display = "none";
  }

  protected async deleteManager() {
    try {
      await this.adminService.deleteManager(this.managerId!);
      location.reload();
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private async getManagers() {
    try {
      this.managers = await this.adminService.getManagers();
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }
}
