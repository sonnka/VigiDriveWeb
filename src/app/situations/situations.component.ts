import {Component, OnInit} from '@angular/core';
import {DriverService} from "../_services/driver.service";
import {SituationStatistics} from "../_models/response/situation.statistics";
import {SituationResponse} from "../_models/response/situation.response";
import {UtilService} from "../_services/util.service";
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
  protected startOfCurrentWeek = UtilService.getStartOfCurrentWeek()
  protected endOfCurrentWeek = UtilService.getEndOfCurrentWeek()
  protected readonly UtilService = UtilService;

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
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
          UtilService.displayError(error, this.router)
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
          UtilService.displayError(error, this.router)
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
          UtilService.displayError(error, this.router)
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
          UtilService.displayError(error, this.router)
        });
    })
  }
}
