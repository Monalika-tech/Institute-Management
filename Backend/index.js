const express = require('express');
const connectDB = require('./config/db.js');
const teacherRoutes = require('./routes/teacherRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const classRoutes = require('./routes/classRoutes.js');
const attendanceRoutes = require('./routes/attendanceRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const cors = require('cors');


// Load environment variables
require("dotenv").config();

// Initialize Express server
const server = express();

// Enable CORS
server.use(cors({
    origin: '*', // Allow all origins (you can specify specific origins if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


// Define Port
const PORT = process.env.PORT || 1337;

// Middleware to parse JSON requests
server.use(express.json());


// Connect to Database
connectDB();


// define routes
server.use('/api/teachers', teacherRoutes);
server.use('/api/students', studentRoutes);
server.use("/api/classes" , classRoutes);
server.use("/api/attendance", attendanceRoutes);
server.use("/api/notifications", notificationRoutes);



// Start the server
server.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
});
