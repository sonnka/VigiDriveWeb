import {MessageDto} from "./message.dto";

export class MessagesResponse {
  receiverId: bigint
  receiverFullName: string;
  avatar: string;
  chatMessages: MessageDto[];

  constructor(receiverId: bigint, receiverFullName: string, avatar: string, chatMessages: MessageDto[]) {
    this.receiverId = receiverId;
    this.receiverFullName = receiverFullName;
    this.avatar = avatar;
    this.chatMessages = chatMessages;
  }
}
