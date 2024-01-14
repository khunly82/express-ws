import { UserDTO } from "./user.dto.js";

export class MessageDTO {
  constructor(message, isSender) {
    this.id = message.id;
    this.message = message.message;
    this.date = message.date;
    this.isSender = isSender;
    this.from = new UserDTO(message.from);
    this.to = new UserDTO(message.to);
  }
}