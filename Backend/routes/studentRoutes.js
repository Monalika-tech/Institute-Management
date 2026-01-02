const express = require('express');
const { registerStudent ,deleteStudent} = require('../controllers/studentController');

const router = express.Router();


//route to register or add new student
router.post('/register', registerStudent);
router.delete('/delete/:_id', deleteStudent);

module.exports = router;
