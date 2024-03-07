export class MessageDto {
  messageId: bigint;
  time: string;
  text: string;
  me: boolean;

  constructor(messageId: bigint, time: string, text: string, me: boolean) {
    this.messageId = messageId;
    this.time = time;
    this.text = text;
    this.me = me;
  }
}
