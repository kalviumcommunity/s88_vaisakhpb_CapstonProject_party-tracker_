import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import EventRoutes from "./routes/Event.route.js"

dotenv.config(); 

const app = express();

const PORT=process.env.PORT || 4000

app.use(express.json());

app.use("/api/event",EventRoutes);

connectDB();

app.listen(PORT, () => {
    console.log("Server started at "+PORT);
});