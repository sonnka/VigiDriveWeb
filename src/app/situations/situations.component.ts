import {Component, OnInit} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {SituationStatistics} from "../_models/situation.statistics";
import {AppComponent} from "../app.component";
import {SituationResponse} from "../_models/situation.response";
import {UtilService} from "../_services/util.service";

@Component({
  selector: 'app-situations',
  templateUrl: './situations.component.html',
  styleUrl: './situations.component.css'
})
export class SituationsComponent implements OnInit {

  protected yearStatistics: SituationStatistics | undefined;
  protected monthStatistics: SituationStatistics | undefined;
  protected weekStatistics: SituationStatistics | undefined;
  protected situations: SituationResponse[] | undefined;
  protected startOfCurrentWeek = '00.00.0000'
  protected endOfCurrentWeek = '00.00.0000'
  protected readonly AppComponent = AppComponent;
  protected readonly UtilService = UtilService;

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    let date = new Date()
    date.setDate(date.getDate() - date.getDay() + 1)
    this.startOfCurrentWeek = AppComponent.formatDate(date) || '00.00.0000';
    date.setDate(date.getDate() + 6)
    this.endOfCurrentWeek = AppComponent.formatDate(date) || '00.00.0000';

    this.getSituationInfo()
    this.getYearStatistics();
    this.getMonthStatistics();
    this.getWeekStatistics()
  }

  protected getSituation(situation: string | undefined): string {
    if (situation == null) {
      return "-";
    }

    return situation.toString().toLowerCase().replace('_', ' ');
  }

  protected getAmountByPeriod(period: number, statistics: SituationStatistics | undefined): string {
    let elements = statistics?.statistics;

    if (elements == null || elements.length == 0) {
      return "";
    }

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].period == period) {
        return elements[i].amount.toString();
      }
    }

    return "";
  }

  protected getPercentByPeriod(period: number, statistics: SituationStatistics | undefined): number {
    let elements = statistics?.statistics;
    let amountOfSituations = statistics?.amountOfSituations;
    if (elements == null || elements.length == 0 || amountOfSituations == null) {
      return 0;
    }

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].period == period) {
        return (elements[i].amount * 100) / amountOfSituations;
      }
    }

    return 0;
  }

  private getYearStatistics() {
    this.driverService.getYearSituationStatistic().subscribe(
      response => {
        console.log('Year statistic' + JSON.stringify(response));
        this.yearStatistics = response;
      }
    )
  }

  private getMonthStatistics() {
    this.driverService.getMonthSituationStatistic().subscribe(
      response => {
        console.log('Month statistic' + JSON.stringify(response));
        this.monthStatistics = response;
      }
    )
  }

  private getWeekStatistics() {
    this.driverService.getWeekSituationStatistic().subscribe(
      response => {
        console.log('Week statistic' + JSON.stringify(response));
        this.weekStatistics = response;
      }
    )
  }

  private getSituationInfo() {
    this.driverService.getSituationInfo()
      .subscribe(response => {
        this.situations = response;
      });
  }
}
