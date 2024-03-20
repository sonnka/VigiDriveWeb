import {Component} from '@angular/core';
import '@angular/material';
import {Router} from "@angular/router";
import {AdminDto} from "../_models/response/admin.dto";
import {AdminService} from "../_services/admin.service";
import {LoginService} from "../_services/login.service";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  protected approvedAdmins: AdminDto[] | undefined;
  protected notApprovedAdmins: AdminDto[] | undefined;
  protected adminResponse: AdminDto | undefined;
  protected fileName = '';
  protected readonly LoginService = LoginService;
  protected readonly UtilService = UtilService;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
    this.getAdminProfile().then(() => {
      if (!this.adminResponse?.newAccount) {
        this.getApprovedAdmins();
        this.getNotApprovedAdmins();
      }
    })
  }

  protected onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
    }
  }

  protected approveAdmin(newAdminId: bigint) {
    this.adminService.approveAdmin(newAdminId).then((r) => {
      r.subscribe(() => {
        location.reload();
      }, (error) => {
        UtilService.displayError(error, this.router)
      });
    })
  }

  protected declineAdmin(newAdminId: bigint) {
    this.adminService.declineAdmin(newAdminId).then((r) => {
      r.subscribe(() => {
        location.reload();
      }, (error) => {
        UtilService.displayError(error, this.router)
      });
    })
  }

  private async getAdminProfile() {
    try {
      this.adminResponse = await this.adminService.getAdmin();
      if (this.adminResponse!.newAccount) {
        await this.router.navigate(["/admin-profile/update"])
      }
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private async getApprovedAdmins() {
    try {
      this.approvedAdmins = await this.adminService.getApprovedAdmins();
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }

  private async getNotApprovedAdmins() {
    try {
      this.notApprovedAdmins = await this.adminService.getNotApprovedAdmins();
    } catch (error) {
      UtilService.displayError(error, this.router)
    }
  }
}
