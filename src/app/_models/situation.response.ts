export class SituationResponse {
  id: bigint;
  start: Date;
  end: Date;
  type: string;
  description: string;
  video: string;

  constructor(id: bigint, start: Date, end: Date, type: string, description: string, video: string) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.type = type;
    this.description = description;
    this.video = video;
  }
}
