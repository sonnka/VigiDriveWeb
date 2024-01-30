import {Component, OnInit} from '@angular/core';
import {HealthInfoResponse} from "../_models/health-info.response";
import {DriverService} from "../_services/driver.service";
import {DriverProfileComponent} from "../driver-profile/driver-profile.component";
import {AppComponent} from "../app.component";
import {HealthStatistics} from "../_models/health.statistics";
import {UtilService} from "../_services/util.service";

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

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    let date = new Date()
    date.setDate(date.getDate() - date.getDay() + 1)
    this.startOfCurrentWeek = AppComponent.formatDate(date) || '00.00.0000';
    date.setDate(date.getDate() + 6)
    this.endOfCurrentWeek = AppComponent.formatDate(date) || '00.00.0000';

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

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].period == period) {
        return elements[i].amount;
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
    this.driverService.getHealthInfo()
      .subscribe(response => {
        this.healthInfo = response;
        console.log('Health info: ' + JSON.stringify(response));
      });
  }

  private getYearStatistics() {
    this.driverService.getYearHealthStatistic().subscribe(
      response => {
        console.log('Year statistic' + JSON.stringify(response));
        this.yearStatistics = response;
      }
    )
  }

  private getMonthStatistics() {
    this.driverService.getMonthHealthStatistic().subscribe(
      response => {
        console.log('Month statistic' + JSON.stringify(response));
        this.monthStatistics = response;
      }
    )
  }

  private getWeekStatistics() {
    this.driverService.getWeekHealthStatistic().subscribe(
      response => {
        console.log('Week statistic' + JSON.stringify(response));
        this.weekStatistics = response;
      }
    )
  }
}
