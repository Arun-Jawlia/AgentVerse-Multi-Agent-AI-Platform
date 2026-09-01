import express from "express";
import { deductCredits, login, logout, updateUserPlan } from "../controllers/auth.controllers.js";

const Router = express.Router();

Router.post("/login", login);
Router.get("/logout", logout);
Router.post("/update-plan", updateUserPlan);
Router.post("/deduct-credits", deductCredits);

export default Router;
