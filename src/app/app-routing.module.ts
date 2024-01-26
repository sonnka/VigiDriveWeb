import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {DriverProfileComponent} from "./driver-profile/driver-profile.component";
import {HealthInfoComponent} from "./health-info/health-info.component";
import {SituationsComponent} from "./situations/situations.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'driver-profile', component: DriverProfileComponent},
  {path: 'health-info', component: HealthInfoComponent},
  {path: 'situations', component: SituationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
