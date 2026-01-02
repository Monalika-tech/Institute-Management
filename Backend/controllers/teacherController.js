const Teacher = require("../models/teacherModel");
//controller to add new teacher

//1. regrister teacher- chceck if teacher exists: yes->status400 - user already exists 
// no-> create new teacher and send response with status 201

const RegisterTeacher = async (req, res) => {
    try {
        const { name, email, password, experiencedYears, qualification, phone_no, address } = req.body;
        const existingTeacher = await Teacher.findOne({
            email
        });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher already exists!" });
        }
        const newTeacher = new Teacher({
            name,
            email,
            password,
            experiencedYears,
            qualification,
            phone_no,
            address
        });
        await newTeacher.save();
        res.status(201).json({
            message: "Teacher registered successfully!",
            teacher: {
                _id: newTeacher._id,
                name: newTeacher.name,
                email: newTeacher.email,
                experiencedYears: newTeacher.experiencedYears
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


// 2. login teacher
const LoginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });
        if (teacher) {
            if (teacher.password !== password) {
                return res.status(401).json({ message: "Invalid Password!" })
            }

            console.log(teacher);
            res.status(200).json({
                message: "Login Successful!",
                teacher: {
                    _id: teacher._id,
                    name: teacher.name,
                    email: teacher.email,
                    experiencedYears: teacher.experiencedYears
                }
            });
        }
        else {
            return res.status(401).json({ message: "Invalid Email" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};

// get teacher by id 
const GetTeacherById = async (req, res) => {        
    try {
        const teacherId = req.params._id;
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        console.log(teacher);
        res.status(200).json({ teacher });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    LoginTeacher, RegisterTeacher, GetTeacherById
};