const express = require('express');
const { LoginTeacher, RegisterTeacher, GetTeacherById } = require('../controllers/teacherController');
const router = express.Router();


const teacherValidator = require('../middleware/vadidators/teachValidationMiddleware');
const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/authorisedMiddleware');
const ownership = require('../middleware/ownership/OwnershipMiddleware');


console.log("In teacher routes");


//public 
router.post('/login', LoginTeacher);

// private routes
// only admin can add teachers so authorization == admin but yet not added so wait !

router.post('/register', teacherValidator, protect, RegisterTeacher);
router.get('/me', protect, authorize('teacher'), ownership, GetTeacherById);


module.exports = router;

