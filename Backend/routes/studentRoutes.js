const express = require('express');
const { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const studValidator = require('../middleware/vadidators/studValidationMiddleware');
const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/authorisedMiddleware');
const ownership = require('../middleware/OwnershipMiddleware');

const router = express.Router();


//route to register or add new student
//Public routes 
router.get('/:_id', protect, authorize('teacher', 'student'), ownership, getStudentById);
router.get('/', protect, authorize('teacher'), ownership, getAllStudents);

//private routes 
router.put('/:_id', studValidator, protect, authorize('teacher', 'student'), ownership, updateStudent);
router.delete('/:_id', protect, authorize('teacher'), ownership, deleteStudent);
router.post('/', studValidator, protect, authorize('teacher'), ownership, registerStudent);
module.exports = router;
