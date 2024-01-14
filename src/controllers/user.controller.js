import { UserDTO } from '../dto/user.dto.js';
import { User } from '../models/user.model.js'

export const UserController = {
  getKnownUsers: async (req, res) => {
    const users = await User.find();
    res.json(users.map(u => new UserDTO(u)));
  }
}