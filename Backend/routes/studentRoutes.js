const express = require('express');
const { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const studValidator = require('../middleware/vadidators/studValidationMiddleware');

const router = express.Router();


//route to register or add new student
router.post('/', studValidator, registerStudent);
router.get('/', getAllStudents);
router.put('/:_id', studValidator, updateStudent);
router.get('/:_id', getStudentById);
router.delete('/:_id', deleteStudent);

module.exports = router;
