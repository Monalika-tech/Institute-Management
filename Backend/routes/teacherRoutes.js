const express = require('express');
const {LoginTeacher, RegisterTeacher, GetTeacherById} = require ('../controllers/teacherController');
const router = express.Router();
const protect = require('../middleware/AuthMiddleware');
console.log("In teacher routes");

router.post('/login', LoginTeacher);
router.post('/register', RegisterTeacher);
router.get('/me', protect, GetTeacherById); 
module.exports = router;