const Student = require("../models/studentModel");
//controller to add new student

//register or create  or addstudent used in registration form
const registerStudent = async (req, res) => {
    try {
        const { name, email, password, classLevel, parentName, phone_no, address, school, monthlyFee } = req.body;
        const existingstudent = await Student.findOne({ email });
        if (existingstudent) {
            console.log("Student already exists!");
            return res.status(400).json({ message: "Student already exists!" });
        }
        const newstudent = new Student({
            name,
            email,
            password,
            classLevel,
            parentName,
            phone_no,
            address,
            school,
            monthlyFee
        });
        await newstudent.save();
        console.log("Student registered successfully!", newstudent);
        res.status(200).json({
            message: "Student registered successfully!",
            student: {
                _id: newstudent._id,
                name: newstudent.name,
                email: newstudent.email,
                classLevel: newstudent.classLevel,
            }
        })

    } catch (error) {

        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }
}

//delete student while deleting the student record
const deleteStudent = async (req, res) => {
    try {
        console.log("requesting parameters : ", req.params);
        const studentId = req.params._id;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const exist = await Student.findById(studentId);
        if (!exist) {
            return res.status(404).json({ message: "Student not found" });
        }

        await Student.findByIdAndDelete(studentId);
        console.log("Student deleted successfully", exist);
        res.status(200).json({ message: "Student deleted successfully", student: exist });
    } catch (error) {
        console.log("Error deleting student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//update student while editing student details
const updateStudent = async (req, res) => {
    //to be implemented later
}

//get single student to see student profile

//get all students - with filtering class wise 


module.exports = { registerStudent, deleteStudent };