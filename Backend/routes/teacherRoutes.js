const express = require('express');
const {LoginTeacher, RegisterTeacher, GetTeacherById} = require ('../controllers/teacherController');
const router = express.Router();

router.post('/login', LoginTeacher);
router.post('/register', RegisterTeacher);
router.get('/:_id', GetTeacherById); 
module.exports = router;