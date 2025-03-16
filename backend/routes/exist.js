//** IMPORTS */
import express from "express";
import { userNameExist } from "../controllers/exist.js";

//** ROUTER */
const router = express.Router();

router.post("/user-name-exist", userNameExist);

export default router;
