const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
    {
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },
        date: {
            type: String, // YYYY-MM-DD
            required: true,
        },
        records: [
            {
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                },
                status: {
                    type: String,
                    enum: ["present", "absent", "leave"],
                    default: "absent",
                },
                note: {
                    type: String,
                    default: "",
                },
            },
        ],
    },
    { timestamps: true }
);

const attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = attendance;