import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {DriverProfileComponent} from './driver-profile/driver-profile.component';
import {HealthInfoComponent} from './health-info/health-info.component';
import {NgOptimizedImage} from "@angular/common";
import { SituationsComponent } from './situations/situations.component';
import { ManagerProfileComponent } from './manager-profile/manager-profile.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { DriverAccessesComponent } from './driver-accesses/driver-accesses.component';
import { ManagerAccessesComponent } from './manager-accesses/manager-accesses.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DriverProfileComponent,
    HealthInfoComponent,
    SituationsComponent,
    ManagerProfileComponent,
    DriverInfoComponent,
    DriverAccessesComponent,
    ManagerAccessesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
