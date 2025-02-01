import express from "express";
import {config} from "dotenv";
config();
import userRoutes from "./Routes/User"
import problemRoutes from "./Routes/Problem"
import { connectDb } from "./db/dB";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { isAuthenticated } from "./Middleware/Authentication";
import path from "path";
const app = express();
const port = process.env.PORT || 7000;
const _dirname = path.resolve();

connectDb();

app.use(express.json());
app.use(cors({
  origin : "http://localhost:5000/",
  credentials : true 
}));

app.use(cookieParser());
app.use("/back/user" , userRoutes);
app.use("/back/problem" , isAuthenticated , problemRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")))

app.use("*" , (_ , res) => {
  res.sendFile(path.resolve(_dirname , "frontend" , "dist" ,  "index.html"))
})

app.listen(port , () => {
  console.log("server running on " + port);
})