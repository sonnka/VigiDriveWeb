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
    this.getAdminProfile();
    if (this.adminResponse?.newAccount) {
      this.router.navigate(["/admin-profile/update"])
    }
    this.getApprovedAdmins();
    this.getNotApprovedAdmins();
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
        this.displayError(error)
      });
    })
  }

  protected declineAdmin(newAdminId: bigint) {
    this.adminService.declineAdmin(newAdminId).then((r) => {
      r.subscribe(() => {
        location.reload();
      }, (error) => {
        this.displayError(error)
      });
    })
  }

  private getAdminProfile() {
    this.adminService.getAdmin().then((r) => {
      r.subscribe(response => {
        this.adminResponse = response;
      }, (error) => {
        this.displayError(error)
      });
    })
  }

  private async getApprovedAdmins() {
    try {
      this.approvedAdmins = await this.adminService.getApprovedAdmins();
      console.log("Approved: " + this.approvedAdmins)
    } catch (error) {
      this.displayError(error)
    }
  }

  private async getNotApprovedAdmins() {
    try {
      this.notApprovedAdmins = await this.adminService.getNotApprovedAdmins();
      console.log("Not approved: " + this.notApprovedAdmins)
    } catch (error) {
      this.displayError(error)
    }
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout(this.router)
    }
    if (error.error) {
      UtilService.showError(error.message)
    } else if (error.message) {
      UtilService.showError(error.error.errorMessage)
    } else {
      UtilService.showError("Something went wrong!")
    }
  }
}
