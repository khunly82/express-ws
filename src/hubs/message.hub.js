import { Server, Socket } from "socket.io";
import { Message } from "../models/message.model.js";
import { MessageDTO } from "../dto/message.dto.js";

/**
 * @type { Object.<string, (io: Server, socket: Socket, ...params: any[]) => void> } 
 */
export const MessageHub = {
  send: async (io, socket, data) => {
    const created = await Message.create({ ...data, from: socket.user.id, to: data.to });
    const message = await Message.findById(created.id)
      .populate('from')
      .populate('to');
    io.to(data.to).emit('newMessage', new MessageDTO(message, false));
    io.to(socket.user.id).emit('newMessage', new MessageDTO(message, true));
  }
}