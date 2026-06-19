const express = require('express');
const { LoginTeacher, RegisterTeacher, GetTeacherById, updateTeacher } = require('../controllers/teacherController');
const router = express.Router();


const teacherValidator = require('../middleware/validators/teachValidationMiddleware');
const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/AuthorisedMiddleware');
const teacherOwnership = require('../middleware/ownership/TeacherOwnershipMiddleware');


console.log("In teacher routes");


//public 
router.post('/login', LoginTeacher);

// private routes
// only admin can add teachers so authorization == admin but yet not added so wait !

router.post('/register', teacherValidator, RegisterTeacher);
router.get('/:_id', protect, authorize('teacher'), teacherOwnership, GetTeacherById);
router.put('/:_id',  protect, authorize('teacher'), teacherOwnership, updateTeacher);


module.exports = router;

