import express from "express";
import { login, logout, updateUserPlan } from "../controllers/auth.controllers.js";

const Router = express.Router();

Router.post("/login", login);
Router.get("/logout", logout);
Router.post("/update-plan", updateUserPlan);

export default Router;
