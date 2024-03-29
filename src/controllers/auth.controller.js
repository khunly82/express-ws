import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const AuthController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    if(!user) {
      user = await User.create({ username, password });
    }

    if(user.password !== password) {
      res.sendStatus(401);
      return;
    }

    const { JWT_SECRET, JWT_DURATION } = process.env;
    res.json({ token: jwt.sign({ 
      id: user.id,
      username: user.username
    }, JWT_SECRET, { expiresIn: JWT_DURATION }) });
  }
}