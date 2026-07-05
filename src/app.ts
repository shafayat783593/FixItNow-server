import cors from 'cors'
import config from "./config";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response }  from 'express';
import { authRouter } from './module/auth/auth.routes';
const app:Application = express()


app.use(cors({
    origin: config.app_url,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use("/api/auth",authRouter)


export default app