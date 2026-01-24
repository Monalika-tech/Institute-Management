const express = require('express');
const { createClass, updateClass, getclassById, getAllClasses, deleteClass } = require('../controllers/classController');
const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/authorisedMiddleware');
const classOwnership = require('../middleware/ownership/ClassOwnershipMiddleware');



const router = express.Router();


//route to register or add new student
router.post('/', protect, authorize('teacher'), classOwnership , createClass);

router.get('/', protect, authorize('teacher'), classOwnership , getAllClasses);
// private route
router.get('/:_id', protect, authorize('teacher'),  classOwnership, getclassById);
router.put('/:_id', protect, authorize('teacher'), classOwnership , updateClass);
router.delete('/:_id', protect, authorize('teacher'),  classOwnership, deleteClass);


module.exports = router;