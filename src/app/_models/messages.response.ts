import {MessageDto} from "./message.dto";

export class MessagesResponse {
  receiverFullName: string;
  chatMessages: MessageDto[];

  constructor(receiverFullName: string, chatMessages: MessageDto[]) {
    this.receiverFullName = receiverFullName;
    this.chatMessages = chatMessages;
  }
}
