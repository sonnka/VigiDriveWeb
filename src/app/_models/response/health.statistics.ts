import {StatisticElement} from "./statistic.element";

export class HealthStatistics {
  generalLevelForPeriod: number;
  worstPeriod: number;
  bestPeriod: number;
  statistics: StatisticElement[];

  constructor(generalLevelForPeriod: number, worstPeriod: number,
              bestPeriod: number, statistics: StatisticElement[]) {
    this.generalLevelForPeriod = generalLevelForPeriod;
    this.worstPeriod = worstPeriod;
    this.bestPeriod = bestPeriod;
    this.statistics = statistics;
  }
}
