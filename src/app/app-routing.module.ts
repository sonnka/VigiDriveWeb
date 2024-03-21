import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {DriverProfileComponent} from "./driver-profile/driver-profile.component";
import {HealthInfoComponent} from "./health-info/health-info.component";
import {SituationsComponent} from "./situations/situations.component";
import {ManagerProfileComponent} from "./manager-profile/manager-profile.component";
import {DriverInfoComponent} from "./driver-info/driver-info.component";
import {DriverAccessesComponent} from "./driver-accesses/driver-accesses.component";
import {ManagerAccessesComponent} from "./manager-accesses/manager-accesses.component";
import {ChatsComponent} from "./chats/chats.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {AdminProfileComponent} from "./admin-profile/admin-profile.component";
import {AdminUpdateProfileComponent} from "./admin-update-profile/admin-update-profile.component";
import {DatabaseComponent} from "./database/database.component";
import {DriversPageComponent} from "./drivers-page/drivers-page.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'driver-profile', component: DriverProfileComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'health-info', component: HealthInfoComponent},
  {path: 'situations', component: SituationsComponent},
  {path: 'manager-profile', component: ManagerProfileComponent},
  {path: 'driver-info', component: DriverInfoComponent},
  {path: 'driver-accesses', component: DriverAccessesComponent},
  {path: 'manager-accesses', component: ManagerAccessesComponent},
  {path: 'chats', component: ChatsComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'admin-profile/update', component: AdminUpdateProfileComponent},
  {path: 'database', component: DatabaseComponent},
  {path: 'drivers', component: DriversPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
