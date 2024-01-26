import {StatisticElement} from "./statistic.element";

export class SituationStatistics {
  amountOfSituations: number;
  mostFrequentSituation: number;
  mostFrequentPeriod: number;
  statistics: StatisticElement[];

  constructor(amountOfSituations: number, mostFrequentSituation: number,
              mostFrequentPeriod: number, statistics: StatisticElement[]) {
    this.amountOfSituations = amountOfSituations;
    this.mostFrequentSituation = mostFrequentSituation;
    this.mostFrequentPeriod = mostFrequentPeriod;
    this.statistics = statistics;
  }
}
