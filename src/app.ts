import cors from 'cors'
import config from "./config";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response }  from 'express';
import { authRouter } from './module/auth/auth.routes';
import { serviceRouter } from './module/services/services.route';
import { categoryRouter } from './module/category/category.route';
import { technicianRouter } from './module/technician/technician.route';
import { adminRouter } from './module/admin/admin.route';
import { bookingRouter } from './module/booking/booking.route';
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

app.use("/api/auth", authRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/technician",technicianRouter )
app.use("/api/services", serviceRouter)
app.use("/api/admin", adminRouter)
app.use("/api/bookings",bookingRouter)


export default app