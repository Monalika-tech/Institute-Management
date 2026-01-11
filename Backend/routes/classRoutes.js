const express = require('express');
const { createClass, updateClass, getclassById, getAllClasses , deleteClass} = require('../controllers/classController');

const router = express.Router();


//route to register or add new student
router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:classLevel', getclassById);
router.put('/:classLevel', updateClass);
router.delete('/:_id',deleteClass);

// router.delete('/delete/:classLeve;', deleteStudent);

module.exports = router;