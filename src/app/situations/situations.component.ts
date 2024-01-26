import {Component, OnInit} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {SituationStatistics} from "../_models/situation.statistics";
import {AppComponent} from "../app.component";
import {SituationResponse} from "../_models/situation.response";

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
  protected week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  protected year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  protected readonly AppComponent = AppComponent;

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

  protected getYearPeriod(number: number | undefined): string {
    switch (number) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return '-';
    }
  }

  protected getMonthPeriod(number: number | undefined): string {
    if (number == null) {
      return "-";
    }
    let date = new Date();
    date.setDate(number);

    return AppComponent.formatDate(date) ?? "-";
  }

  protected getWeekPeriod(number: number | undefined): string {
    switch (number) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 7:
        return 'Sunday';
      default:
        return '-';
    }
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

  protected getTodayDate(): string {
    return AppComponent.formatDateTime(new Date()) || "00.00.0000 00:00";
  }

  protected getAmountOfDaysInMonth(): number[] {
    let today = new Date();
    let daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    let array = [];
    for (let i = 1; i <= daysInMonth; i++) {
      array[i - 1] = i;
    }
    return array;
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
