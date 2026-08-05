import express from "express";
import { login, logout } from "../controllers/auth.controllers.js";

const Router = express.Router();

Router.post("/login", login);
Router.get("/logout", logout);

export default Router;
