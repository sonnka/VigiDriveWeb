import {StatisticElement} from "./statistic.element";

export class SituationStatistics {
  amountOfSituations: number;
  mostFrequentSituation: string;
  mostFrequentPeriod: number;
  statistics: StatisticElement[];

  constructor(amountOfSituations: number, mostFrequentSituation: string,
              mostFrequentPeriod: number, statistics: StatisticElement[]) {
    this.amountOfSituations = amountOfSituations;
    this.mostFrequentSituation = mostFrequentSituation;
    this.mostFrequentPeriod = mostFrequentPeriod;
    this.statistics = statistics;
  }
}
