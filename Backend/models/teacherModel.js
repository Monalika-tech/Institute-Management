const mongoose = require('mongoose');
//create schema for teacher model
const teacherSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    experiencedYears: { type: Number },
    qualification: { type: String },
    phone_no: { type: Number, required: true, unique: true },
    address: { type: String }
    // subjectSpecialization: { type: String }
});

//create model for teacher
const Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;