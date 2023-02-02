import express, {Application} from 'express';
import dotenv from "dotenv"
import { createServer } from "http";
import cors from "cors";
import passport from "passport";
import compression from "compression";
import cookieParser from "cookie-parser";
import { initDb } from "./db";
import { initPassport } from "./configs/passport.configs";
import router from './routes';

dotenv.config()
const app:Application = express();
const port:number = 5000;
initDb();
initPassport();


app.use(compression());
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

const httpServer = createServer(app);


httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});