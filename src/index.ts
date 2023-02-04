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
import session from 'express-session';
dotenv.config()
const app:Application = express();
app.use(session({
  name : 'codeil',
  secret : 'something',
  resave :false,
  saveUninitialized: true,
  cookie : {
          maxAge:(1000 * 60 * 100)
  }      
}));
const port:number = 5000;
initDb();
initPassport();


app.use(compression());
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

const httpServer = createServer(app);


httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});