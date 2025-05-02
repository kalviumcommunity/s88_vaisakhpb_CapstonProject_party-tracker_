// const express = require('express');
// const mongoose = require('mongoose');
// // const cors = require('cors');
// require('dotenv').config();


// // const eventRoutes = require('./routes/events');

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// // app.use(cors());
// app.use(express.json());

// // Routes
// // app.use('/api', eventRoutes);

// // MongoDB Connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(err => console.error(err));
// server.js
// backend/server.js



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const eventRoutes = require('./routes/events'); // Import your routes

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', eventRoutes); // All /api/events requests go to eventRoutes

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });


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