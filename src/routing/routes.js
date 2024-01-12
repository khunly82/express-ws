import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const routes = Router();

routes.route('/')
  .get((req, res) => res.json({ message: 'Hello World !!' }));

routes.post('/login', AuthController.login);
