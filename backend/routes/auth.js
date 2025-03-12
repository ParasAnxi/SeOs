//** IMPORTS */
import express from "express";
import { loginUser, createAccount } from "../controllers/auth.js";
//** CONFIG */
const router = express.Router();
//** CREATE ACCOUNT */
router.post("/createAccount",createAccount);
//** LOGIN */
router.post("/login",loginUser);

export default router;