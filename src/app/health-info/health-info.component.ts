import {Component, OnInit} from '@angular/core';
import {HealthInfoResponse} from "../_models/response/health-info.response";
import {DriverService} from "../_services/driver.service";
import {DriverProfileComponent} from "../driver-profile/driver-profile.component";
import {AppComponent} from "../app.component";
import {HealthStatistics} from "../_models/response/health.statistics";
import {UtilService} from "../_services/util.service";
import {LoginService} from "../_services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrl: './health-info.component.css'
})
export class HealthInfoComponent implements OnInit {

  protected healthInfo: HealthInfoResponse | undefined;
  protected readonly DriverProfileComponent = DriverProfileComponent;
  protected readonly AppComponent = AppComponent;
  protected yearStatistics: HealthStatistics | undefined;
  protected monthStatistics: HealthStatistics | undefined;
  protected weekStatistics: HealthStatistics | undefined;
  protected info: HealthInfoResponse[] | undefined;
  protected startOfCurrentWeek = '00.00.0000'
  protected endOfCurrentWeek = '00.00.0000'
  protected readonly UtilService = UtilService;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    let date = new Date()
    date.setDate(date.getDate() - date.getDay() + 1)
    this.startOfCurrentWeek = UtilService.formatDate(date) || '00.00.0000';
    date.setDate(date.getDate() + 6)
    this.endOfCurrentWeek = UtilService.formatDate(date) || '00.00.0000';

    this.getHealthInfo();
    this.getYearStatistics();
    this.getMonthStatistics();
    this.getWeekStatistics()
  }

  protected getPercentByPeriod(period: number, statistics: HealthStatistics | undefined): number {
    let elements = statistics?.statistics;
    if (elements == null || elements.length == 0) {
      return 0;
    }

    for (const element of elements) {
      if (element.period == period) {
        return element.amount;
      }
    }

    return 0;
  }

  protected getAmountByPeriod(period: number, statistics: HealthStatistics | undefined): string {
    let amount = this.getPercentByPeriod(period, statistics);

    if (amount == 0) {
      return '';
    }

    return amount + '%';
  }

  private getHealthInfo() {
    this.driverService.getHealthInfo().then((r) => {
      r.subscribe((response) => {
          this.healthInfo = response;
        },
        (error) => {
          this.displayError(error)
        }
      );
    })
  }

  private getYearStatistics() {
    this.driverService.getYearHealthStatistic().then((r) => {
      r.subscribe(
        response => {
          this.yearStatistics = response;
        },
        (error) => {
          this.displayError(error)
        }
      )
    })
  }

  private getMonthStatistics() {
    this.driverService.getMonthHealthStatistic().then((r) => {
      r.subscribe(
        response => {
          this.monthStatistics = response;
        },
        (error) => {
          this.displayError(error)
        }
      )
    })
  }

  private getWeekStatistics() {
    this.driverService.getWeekHealthStatistic().then((r) => {
      r.subscribe(
        response => {
          this.weekStatistics = response;
        },
        (error) => {
          this.displayError(error)
        }
      )
    })
  }

  private displayError(error: any) {
    if (error.status == 401) {
      LoginService.logout(this.router)
    }
    if (error.message != null) {
      UtilService.showError(error.message)
    } else if (error.error != null) {
      UtilService.showError(error.error.errorMessage)
    } else {
      UtilService.showError("Something went wrong!")
    }
  }
}
