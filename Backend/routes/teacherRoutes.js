const express = require('express');
const {LoginTeacher, RegisterTeacher, GetTeacherById} = require ('../controllers/teacherController');
const router = express.Router();
const protect = require('../middleware/AuthMiddleware');

const teacherValidator = require('../middleware/vadidators/teachValidationMiddleware');

console.log("In teacher routes");

router.post('/login', LoginTeacher);
router.post('/register', teacherValidator, RegisterTeacher);
router.get('/me', protect, GetTeacherById); 
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
