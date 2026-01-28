const mongoose = require('mongoose');

//create studentSchema for student Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true,  lowercase: true, trim: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/] },
    password: { type: String, required: true, select: false },
    classLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    parentName: { type: String, required: true },
    phone_no: { type: String, required: true, trim: true, maxlength: 10, match: [/^\d{10}$/] },
    address: { type: String, required: true },
    school: { type: String, required: true },
    monthlyFee: { type: Number, required: true },    // joinDate: { type: Date, default: Date.now },
},
    { timestamps: true });

studentSchema.index(
    { email: 1, classLevel: 1 },
    { unique: true }
);

//CREATE student MODEL
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
