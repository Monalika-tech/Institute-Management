const mongoose = require('mongoose');

//create studentSchema for student Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classLevel: { type: Number, required: true },
    parentName: { type: String, required: true },
    phone_no: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    school: { type: String, required: true },
    monthlyFee: { type: Number, required: true },
    // joinDate: { type: Date, default: Date.now },
});

//CREATE student MODEL
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
