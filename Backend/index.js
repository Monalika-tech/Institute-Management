const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const teacherRoutes = require('./routes/teacherRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');


// Load environment variables
require("dotenv").config();

// Initialize Express server
const server = express();

// Define Port
const PORT = process.env.PORT || 1337;

// Middleware to parse JSON requests
server.use(express.json());

// Connect to Database
connectDB();


// define routes
server.use('/teachers',teacherRoutes);
server.use('/students',studentRoutes);


// Start the server
server.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
});
