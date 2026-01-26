const Student = require("../models/studentModel");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const Classes = require("../models/classModel");
//controllers for student

//register or create  or addstudent used in registration form
const registerStudent = async (req, res) => {
    try {
        const { name, email, password, classLevel, parentName, phone_no, address, school, monthlyFee } = req.body;
        const existingstudent = await Student.findOne({ email });

        if (existingstudent) {
            console.log("Student already exists!");
            return res.status(400).json({ message: "Student already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const cls = await Classes.findOne({_id: classLevel, teacherID : req.user._id});
         
        if(!cls) return res.status(403).json({message: "Invalid class access" })

        const newstudent = new Student({
            name,
            email,
            password: hashedPassword,
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
                password : newstudent.password,
                classLevel: newstudent.classLevel,
                parentName: newstudent.parentName,
                phone_no: newstudent.phone_no,
                address: newstudent.address,
                school: newstudent.school,
                monthlyFee: newstudent.monthlyFee
            }
        })

    } catch (error) {

        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }
}
// cretae a proper login contoroller this is not ready and remember to add a token with role student 
const LoginStudent = async (req, res) => {
    //login student
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {

            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("Student found:", student);
        const isMatch = await bcrypt.compare(password, student.password);
        console.log('Password match ?', isMatch);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }


        const token = jwt.sign(
            {
                id: student._id,
                role: "student"
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({
            message: "student login succesfull",
            token,
            student: student
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }
};

//delete student while deleting the student record
const deleteStudent = async (req, res) => {
    try {
        console.log("requesting parameters : ", req.params);
        const _id = req.params;

        if (!_id) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const exist = await Student.findById(_id);
        if (!exist) {
            return res.status(404).json({ message: "Student not found" });
        }

        await Student.deleteOne(_id);

        console.log("Student deleted successfully", exist);
        res.status(200).json({ message: "Student deleted successfully", student: exist });

    } catch (error) {
        console.log("Error deleting student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//update student while editing student details
const updateStudent = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, email, password, classLevel, parentName, phone_no, address, school, monthlyFee } = req.body;

        const existingStudent = await Student.findOne({ _id });

        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }


        existingStudent.name = name || existingStudent.name;
        existingStudent.email = email || existingStudent.email;
        existingStudent.password = password || existingStudent.password;
        existingStudent.classLevel = classLevel || existingStudent.classLevel;
        existingStudent.parentName = parentName || existingStudent.parentName;
        existingStudent.phone_no = phone_no || existingStudent.phone_no;
        existingStudent.address = address || existingStudent.address;
        existingStudent.school = school || existingStudent.school;
        existingStudent.monthlyFee = monthlyFee || existingStudent.monthlyFee;
        await existingStudent.save();

        return res.status(200).json({
            message: "Student updated successfully",
            student: existingStudent,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }

};

//get single student to see student profile
const getStudentById = async (req, res) => {
    try {

        const { _id } = req.params;
        console.log("Fetching student with ID:", _id);
        const student = await Student.findOne({ _id });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({
            message: "Student retrieved successfully",
            student,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }
};
//get all students - with filtering class wise 
const getAllStudents = async (req, res) => {
    try {
        // const { classLevel } = req.params;
        // let filter = {};

        // if (classLevel) {
        //     filter.classLevel = classLevel;
        // }

        const students = await Student.find({});


        res.status(200).json({
            message: "Students retrieved successfully",
            students,
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error", error: error.message
        });
    }
};


module.exports = { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, LoginStudent };