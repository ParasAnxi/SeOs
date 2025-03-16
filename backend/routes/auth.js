//** IMPORTS */
import express from "express";
import { loginUser, createAccount, changePassword } from "../controllers/auth.js";
//** CONFIG */
const router = express.Router();
//** CREATE ACCOUNT */
router.post("/createAccount",createAccount);
//** LOGIN */
router.post("/login",loginUser);
//** CHANGE PASSWORD */
router.post("/changePassword",changePassword)

export default router;