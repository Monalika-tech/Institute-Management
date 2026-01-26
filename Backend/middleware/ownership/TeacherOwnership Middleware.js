// const Classes = require("../../models/classModel");
// const Student = require("../../models/studentModel");


const teacherOwnership = async (req, res, next) => {
    try {
        const user = req.user;

        const teacherID = req.params._id;

        if (user.role === "admin") {
            return next();

        }

        // if (user.role === "student") {

        //     const studentId = user._id;

        //     if (!studentId) {
        //         return res.status(403).json({
        //             message: "Accessed denied!"
        //         })
        //     }

        //     // 1️ Find student
        //     const student = await Student.findById(studentId);
        //     if (!student) {
        //         return res.status(404).json({ message: "Student not found" });
        //     }

        //     // 2️ Find class of student
        //     const cls = await Classes.findById(student.classLevel);
        //     if (!cls) {
        //         return res.status(404).json({ message: "Class not found" });
        //     }

        //     // 3️ Check ownership
        //     if (cls.teacherID.toString() !== teacherID) {
        //         return res.status(403).json({
        //             message: "Cannot see details of other teacher",
        //         });
        //     }

        //     next();
        // }


        if (user.role === "teacher") {
            if (req.params._id === user._id.toString()) {
                return next();
            }
            return res.status(403).json({ message: "Access denied" });
        }


    } catch (error) {

        return res.status(500).json({
            messgae: " Teacher Ownership denied!",
            error: error.message
        })
    }

}

module.exports = teacherOwnership;