//** IMPORTS */
import express from "express";
import cors from "cors";
import dotev from "dotenv";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
//** FILE CONFIG */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//** CONFIG */
const app = express();
dotev.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended : true }));
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

//** FILE */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//** SERVER */
const PORT = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
.then(()=>{
    app.listen(PORT,() => console.log(`Server running at PORT : ${PORT}`));
})
.catch((error) => console.log(`${error} Did not Connect!`));
