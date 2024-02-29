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
import {MessagesComponent} from "./messages/messages.component";
import {ChatsComponent} from "./chats/chats.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'driver-profile', component: DriverProfileComponent},
  {path: 'health-info', component: HealthInfoComponent},
  {path: 'situations', component: SituationsComponent},
  {path: 'manager-profile', component: ManagerProfileComponent},
  {path: 'driver-info', component: DriverInfoComponent},
  {path: 'driver-accesses', component: DriverAccessesComponent},
  {path: 'manager-accesses', component: ManagerAccessesComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'chats', component: ChatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
