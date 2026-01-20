const mongoose = require('mongoose');
//create schema for teacher model
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/] },
    password: { type: String, required: true },
    experiencedYears: { type: Number },
    qualification: { type: String, trim:true },
    phone_no: { type: String, required: true, unique: true, trim: true, maxlength: 10, match: [/^\d{10}$/] },
    address: { type: String },
    role: { type: String, enum: ['admin', 'teacher'], default: 'teacher' },
    // subjectSpecialization: { type: String }
},
{ timestamps: true });

//create model for teacher
const Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;