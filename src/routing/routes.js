import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { IsLoggedGuard } from "../guards/is-logged.guard.js";
import { UserController } from "../controllers/user.controller.js";
import { MessageController } from "../controllers/message.controller.js";

export const routes = Router();

routes.route('/')
  .get((req, res) => res.json({ message: 'Hello World !!' }));

routes.route('/users')
  .get(IsLoggedGuard, UserController.getKnownUsers);

routes.route('/message')
  .get(IsLoggedGuard, MessageController.getConversationByOtherId);

routes
  .post('/login', AuthController.login);

