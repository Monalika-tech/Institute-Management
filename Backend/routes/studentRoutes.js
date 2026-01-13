const express = require('express');
const { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();


//route to register or add new student
router.post('/', registerStudent);
router.get('/', getAllStudents);
router.put('/:_id', updateStudent);
router.get('/:_id', getStudentById);
router.delete('/:_id', deleteStudent);

module.exports = router;
