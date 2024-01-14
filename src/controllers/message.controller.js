import { MessageDTO } from "../dto/message.dto.js";
import { Message } from "../models/message.model.js"

export const MessageController = {
  getConversationByOtherId: async (req, res) => {
    const { otherId } = req.query;
    const { id } = req.user;

    const messages = await Message.find({
      $or: [
        { from: id, to: otherId },
        { from: otherId, to: id },
      ]
    }).populate('from')
    .populate('to');
    res.json(messages.map(m => new MessageDTO(m, m.from._id == id)));
  }
} 