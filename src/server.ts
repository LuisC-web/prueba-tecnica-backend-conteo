import express from "express";
import { connectDB } from "./config/db";

import morgan from "morgan";
import cors from "cors";
import { corsOptions } from "./config/cors";
import usersRoutes from "./routes/usersRoutes";
connectDB();
const app = express();
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(express.json());
app.use("/", usersRoutes);

export default app;
