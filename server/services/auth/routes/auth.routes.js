import express from "express";
import { login } from "../controllers/auth.controllers.js";

const Router = express.Router();

Router.post("/login", login);

export default Router;
