import { UserDTO } from '../dto/user.dto.js';
import { Message } from '../models/message.model.js';

export const UserController = {
  getKnownUsers: async (req, res) => {
    const messages = await Message.find({
      $or: [{ from: req.user.id }, { to: req.user.id }]
    }).populate('from').populate('to');
    const users = messages
      .map(m => m.from.id == req.user.id ? m.to : m.from)
      .reduce((prev, next) => {
        if(!prev.some(u => u.id === next.id)) {
          prev = [...prev, next];
        }
        return prev;
      }, []);
    res.json(users.map(u => new UserDTO(u)));
  }
}