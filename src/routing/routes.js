import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { IsLoggedGuard } from "../guards/is-logged.guard.js";

export const routes = Router();

routes.route('/')
  .get((req, res) => res.json({ message: 'Hello World !!' }));

routes.route('/secured')
  .get(IsLoggedGuard, (req, res) => res.json({ message: 'top secret' }));

routes.post('/login', AuthController.login);
