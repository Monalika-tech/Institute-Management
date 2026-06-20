// Load environment variables
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db.js');

// routes
const teacherRoutes = require('./routes/teacherRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const classRoutes = require('./routes/classRoutes.js');
const attendanceRoutes = require('./routes/attendanceRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

// Initialize Express server
const server = express();

// Define Port
const PORT = process.env.PORT || 1337;

// Enable CORS
server.use(cors({
    origin: process.env.CLIENT_URL, // specified origin
    credentials: true, // allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));




// Middleware to parse JSON requests
server.use(express.json());


// Connect to Database
connectDB();

server.use(cookieParser());


// define routes
server.use('/api/teachers', teacherRoutes);
server.use('/api/students', studentRoutes);
server.use("/api/classes", classRoutes);
server.use("/api/attendance", attendanceRoutes);
server.use("/api/notifications", notificationRoutes);
server.use("/api/auth", authRoutes);



// Start the server
server.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
});
