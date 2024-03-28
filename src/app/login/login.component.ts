import {Component} from '@angular/core';
import {LoginService} from "../_services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public isLoggedIn = false;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   const first = params['first'];
    //   if (first) {
    //     window.location.href = "http://127.0.0.1:8080/oauth2/authorize?response_type=code&client_id=oidcclient&redirect_uri=http://127.0.0.1:8080/auth";
    //   }
    // });
  }


  protected async googleLogin(email: string, password: string) {
    try {
      await this.loginService.login(email, password);
      console.log("---")

      let token = this.loginService.getCode()

      console.log("Token=" + token)
      console.log("---")

    } catch (e) {
      UtilService.displayError(e, this.router)
    }
  }

}
