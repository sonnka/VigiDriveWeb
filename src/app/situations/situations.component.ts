import {Component, OnInit} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {SituationStatistics} from "../_models/situation.statistics";
import {SituationResponse} from "../_models/situation.response";
import {UtilService} from "../_services/util.service";
import {LoginService} from "../_services/login.service";
import {Router} from "@angular/router";

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
  protected readonly UtilService = UtilService;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    let date = new Date()
    date.setDate(date.getDate() - date.getDay() + 1)
    this.startOfCurrentWeek = UtilService.formatDate(date) || '00.00.0000';
    date.setDate(date.getDate() + 6)
    this.endOfCurrentWeek = UtilService.formatDate(date) || '00.00.0000';

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

    for (const element of elements) {
      if (element.period == period) {
        return element.amount.toString();
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

    for (const element of elements) {
      if (element.period == period) {
        return (element.amount * 100) / amountOfSituations;
      }
    }

    return 0;
  }

  private getYearStatistics() {
    this.driverService.getYearSituationStatistic().then((r) => {
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
    this.driverService.getMonthSituationStatistic().then((r) => {
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
    this.driverService.getWeekSituationStatistic().then((r) => {
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

  private getSituationInfo() {
    this.driverService.getSituationInfo().then((r) => {
      r.subscribe(response => {
          this.situations = response;
        },
        (error) => {
          this.displayError(error)
        });
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
