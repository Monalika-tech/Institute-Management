const mongoose = require('mongoose');

// create a schema for classes 
const classSchema = new mongoose.Schema({
    classLevel: { type: Number, required: true, },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    // totalStudent: { type: Number, required: true },
    batchTime: { type: String, required: true, trim: true },
},
    { timestamps: true }
);

const Classes = mongoose.model("Class", classSchema);

module.exports = Classes;