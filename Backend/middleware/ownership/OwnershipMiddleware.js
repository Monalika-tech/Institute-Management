const Classes = require("../../models/classModel");
const Student = require("../../models/studentModel");
console.log(" in student ownership ");

const ownership = async (req, res, next) => {
    try {
        const user = req.user;

        // Admin bypass (future)
        if (user.role === "admin") return next();

        // STUDENT: only own data
        if (user.role === "student") {
            if (req.params._id === user._id.toString()) {
                return next();
            }
            return res.status(403).json({ message: "Access denied" });
        }

        // TEACHER: owns class → owns student
        if (user.role === "teacher") {

            const studentId = req.params._id; //Which student is being accessed?

            // list routes (getAll, register)
            if (!studentId) return next();

            // 1️ Find student
            const student = await Student.findById(studentId); // route - get, update, delete
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }

            console.log("the student we want to access ", student);
            // 2️ Find class of student
            const cls = await Classes.findById(student.classID);
            if (!cls) {
                return res.status(404).json({ message: "Class not found" });
            }

            // 3️ Check ownership
            if (cls.teacherID.toString() !== user._id.toString()) {
                return res.status(403).json({
                    message: "You do not own this student",
                });
            }

            return next();
        }

        return res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
        return res.status(500).json({ message: "Ownership check failed", error: error.message });
    }
};

module.exports = ownership;


// in future add - Ownership (future) must answer: “Is this THEIR data?”