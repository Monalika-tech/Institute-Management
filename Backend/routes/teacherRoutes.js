const express = require('express');
const { LoginTeacher, RegisterTeacher, GetTeacherById } = require('../controllers/teacherController');
const router = express.Router();


const teacherValidator = require('../middleware/vadidators/teachValidationMiddleware');
const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/authorisedMiddleware');
const ownership = require('../middleware/OwnershipMiddleware');


console.log("In teacher routes");


//public 
router.post('/login', LoginTeacher);

// private routes
// only admin can add teachers so authorization == admin but yet not added so wait !
router.post('/register', teacherValidator, protect, RegisterTeacher);

router.get('/me', protect, authorize('teacher'), ownership, GetTeacherById);


module.exports = router;



// const express = require('express');
// const {
//   LoginTeacher,
//   RegisterTeacher,
//   GetTeacherById
// } = require('../controllers/teacherController');

// const router = express.Router();

// const protect = require('../middleware/AuthMiddleware');
// const authorizeRoles = require('../middleware/authorize.middleware');
// const teacherValidator = require('../middleware/vadidators/teachValidationMiddleware');

// console.log("In teacher routes");

// // Public
// router.post('/login', LoginTeacher);

// // Only ADMIN can register teachers
// router.post(
//   '/register',
//   protect,
//   authorizeRoles('admin'),
//   teacherValidator,
//   RegisterTeacher
// );

// // Logged-in teacher/admin can see own profile
// router.get(
//   '/me',
//   protect,
//   authorizeRoles('admin', 'teacher'),
//   GetTeacherById
// );

// module.exports = router;
