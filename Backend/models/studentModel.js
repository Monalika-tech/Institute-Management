const mongoose = require('mongoose');

//create studentSchema for student Model
const studentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    class: { type: String, required: true },
    parentName: { type: String, required: true },
    phone_no: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    school: { type: String, required: true },
    monthlyFee: { type: Number, required: true },
    joinDate: { type: Date, default: Date.now },
    // email: {type: String, required: true, unique: true},    
    // password: {type: String, required: true},    becoz we need them during student login or registration
});

//CREATE student MODEL
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
