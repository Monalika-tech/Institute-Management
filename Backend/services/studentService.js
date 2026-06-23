const Student = require("../models/studentModel");
const Classes = require("../models/classModel");
const { HttpError } = require("../utils/errors");
const { hashPassword, comparePassword } = require("../utils/passwordService");
const { signAuthToken } = require("../utils/token");

const registerStudent = async (data, teacherId) => {
    const { name, email, password, classID, parentName, phone_no, address, school, monthlyFee } = data;

    const existingstudent = await Student.findOne({ email, classID });
    if (existingstudent) {
        throw new HttpError(400, { message: "Student already exists in this class!" });
    }

    const cls = await Classes.findOne({ _id: classID, teacherID: teacherId });
    if (!cls) {
        throw new HttpError(403, { message: "Invalid class access" });
    }

    const hashedPassword = await hashPassword(password);
    const newstudent = new Student({
        name,
        email,
        password: hashedPassword,
        classID,
        parentName,
        phone_no,
        address,
        school,
        monthlyFee,
    });
    await newstudent.save();

    return {
        message: "Student registered successfully!",
        student: {
            _id: newstudent._id,
            name: newstudent.name,
            email: newstudent.email,
            password: newstudent.password,
            classID: newstudent.classID,
            parentName: newstudent.parentName,
            phone_no: newstudent.phone_no,
            address: newstudent.address,
            school: newstudent.school,
            monthlyFee: newstudent.monthlyFee,
        },
    };
};

const loginStudent = async ({ email, password }) => {
    const student = await Student.findOne({ email });
    if (!student) {
        throw new HttpError(401, { message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, student.password);
    if (!isMatch) {
        throw new HttpError(401, { message: "Invalid credentials" });
    }

    const token = signAuthToken({ id: student._id, role: "student" });

    return {
        message: "student login succesfull",
        token,
        role: "student",
        userId: student._id,
        student,
    };
};

const deleteStudent = async (studentId) => {
    if (!studentId) {
        throw new HttpError(400, { message: "Student ID is required" });
    }

    const exist = await Student.findById(studentId);
    if (!exist) {
        throw new HttpError(404, { message: "Student not found" });
    }

    await Student.deleteOne({ _id: studentId });

    return { message: "Student deleted successfully", student: exist };
};

const updateStudent = async (studentId, data) => {
    const { name, email, password, classID, parentName, phone_no, address, school, monthlyFee } = data;

    const existingStudent = await Student.findOne({ _id: studentId });
    if (!existingStudent) {
        throw new HttpError(404, { message: "Student not found" });
    }

    existingStudent.name = name || existingStudent.name;
    existingStudent.email = email || existingStudent.email;
    existingStudent.classID = classID || existingStudent.classID;
    existingStudent.parentName = parentName || existingStudent.parentName;
    existingStudent.phone_no = phone_no || existingStudent.phone_no;
    existingStudent.address = address || existingStudent.address;
    existingStudent.school = school || existingStudent.school;
    existingStudent.monthlyFee = monthlyFee || existingStudent.monthlyFee;

    if (password) {
        existingStudent.password = await hashPassword(password);
    }

    await existingStudent.save();

    return {
        message: "Student updated successfully",
        student: existingStudent,
    };
};

const getStudentById = async (studentId) => {
    const student = await Student.findById(studentId).populate("classID", "classLevel batchTime");
    if (!student) {
        throw new HttpError(404, { message: "Student not found" });
    }

    return {
        message: "Student retrieved successfully",
        student,
    };
};

const getAllStudents = async (teacherId) => {
    const classes = await Classes.find({ teacherID: teacherId }).select("_id");
    const classIds = classes.map((c) => c._id);

    const students = await Student.find({ classID: { $in: classIds } }).populate(
        "classID",
        "classLevel batchTime"
    );

    return {
        message: "Students retrieved successfully",
        students,
    };
};

const getStudentByClass = async (teacherId, classId) => {
    const classData = await Classes.findOne({
        _id: classId,
        teacherID: teacherId,
    });

    if (!classData) {
        throw new HttpError(403, { message: "Not your class!!" });
    }

    const students = await Student.find({ classID: classId }).populate(
        "classID",
        "classLevel batchTime"
    );

    return { students };
};

module.exports = {
    registerStudent,
    loginStudent,
    deleteStudent,
    updateStudent,
    getStudentById,
    getAllStudents,
    getStudentByClass,
};
