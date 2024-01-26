import {Component, OnInit} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {SituationStatistics} from "../_models/situation.statistics";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-situations',
  templateUrl: './situations.component.html',
  styleUrl: './situations.component.css'
})
export class SituationsComponent implements OnInit {

  protected yearStatistics: SituationStatistics | undefined;

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.getYearStatistics();
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

  protected getSituation(situation: number | undefined): string {
    if (situation == null) {
      return "-";
    }

    return situation.toString().toLowerCase().replace('_', ' ');
  }

  protected getAmountByPeriod(period: number): string {
    let elements = this.yearStatistics?.statistics;

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

  protected getPercentByPeriod(period: number): number {
    let elements = this.yearStatistics?.statistics;
    let amountOfSituations = this.yearStatistics?.amountOfSituations;
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

  private getYearStatistics() {
    this.driverService.getYearSituationStatistic().subscribe(
      response => {
        console.log('Statistic' + JSON.stringify(response));
        this.yearStatistics = response;
      }
    )
  }
}
