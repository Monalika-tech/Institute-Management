const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
console.log("teachValidationMiddleware loaded");
const teacherValidator = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters').trim(),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').isStrongPassword().withMessage('password must be a strong password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('experiencedYears').optional().isNumeric().withMessage('Experienced years must be a number'),
    body('qualification').optional().isString().withMessage('Qualification must be a string').trim(),
    body('phone_no').notEmpty().withMessage('Phone number is required').isLength({ max: 10 }).withMessage('Phone number must be at most 10 digits').matches(/^\d{10}$/).withMessage('Phone number must be numeric and exactly 10 digits'),
    body('role').optional().isIn(['admin', 'teacher']).withMessage('Role must be either admin or teacher'),
    body('address').notEmpty().withMessage('Address is required'),


    (req, res, next) => {
        const results = validationResult(req);
        error = results.errors;

        let err = error.map((error) => error.msg);
        if (err.length > 0) {
            return res.status(400).json({ errors: err });
        }
        else {
            next();
        }


    },

];
module.exports = teacherValidator;