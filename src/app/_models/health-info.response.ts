export class HealthInfoResponse {
  id: bigint;
  time: Date;
  stressLevel: number;
  concentrationLevel: number;
  sleepinessLevel: number;
  generalStatus: number;

  constructor(id: bigint, time: Date, stressLevel: number, concentrationLevel: number, sleepinessLevel: number,
              generalStatus: number) {
    this.id = id;
    this.time = time;
    this.stressLevel = stressLevel;
    this.concentrationLevel = concentrationLevel;
    this.sleepinessLevel = sleepinessLevel;
    this.generalStatus = generalStatus;
  }
}
