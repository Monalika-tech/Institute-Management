const express = require('express');
const { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, LoginStudent, getStudentByClass } = require('../controllers/studentController');
const studValidator = require('../middleware/vadidators/studValidationMiddleware');
const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/authorisedMiddleware');
const ownership = require('../middleware/ownership/OwnershipMiddleware');

const router = express.Router();


//route to register or add new student
router.post('/', studValidator, protect, authorize('teacher'), ownership, registerStudent);
router.get('/my', protect, authorize('teacher'), ownership, getAllStudents); // will get all student under teacher
router.get('/class/:_id', protect, authorize('teacher'), ownership, getStudentByClass); // will get all student under particular class

router.post('/login', LoginStudent)

router.get('/:_id', protect, authorize('teacher', 'student'), ownership, getStudentById);
router.delete('/:_id', protect, authorize('teacher'), ownership, deleteStudent);
router.put('/:_id', studValidator, protect, authorize('teacher', 'student'), ownership, updateStudent);


module.exports = router;
