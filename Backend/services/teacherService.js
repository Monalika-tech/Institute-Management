const Teacher = require("../models/teacherModel");
const { HttpError } = require("./errors");
const { hashPassword, comparePassword } = require("./passwordService");
const { signAuthToken } = require("./tokenService");

const registerTeacher = async (data) => {
    const { name, email, password, experiencedYears, qualification, phone_no, address } = data;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
        throw new HttpError(400, { message: "Teacher already exists!" });
    }

    const hashedPassword = await hashPassword(password);
    const newTeacher = new Teacher({
        name,
        email,
        password: hashedPassword,
        experiencedYears,
        qualification,
        phone_no,
        address,
    });
    await newTeacher.save();

    return {
        statusCode: 201,
        body: {
            message: "Teacher registered successfully!",
            teacher: {
                _id: newTeacher._id,
                name: newTeacher.name,
                email: newTeacher.email,
                experiencedYears: newTeacher.experiencedYears,
            },
        },
    };
};

const loginTeacher = async ({ email, password }) => {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
        throw new HttpError(401, { message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, teacher.password);
    if (!isMatch) {
        throw new HttpError(401, { message: "Invalid credentials" });
    }

    const token = signAuthToken({ id: teacher._id, role: "teacher" });

    return {
        statusCode: 200,
        body: {
            message: "Login Successful!",
            token,
            role: "teacher",
            userId: teacher._id,
            teacher: {
                _id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                phone_no: teacher.phone_no,
                address: teacher.address,
                qualification: teacher.qualification,
                experiencedYears: teacher.experiencedYears,
            },
        },
    };
};

const getTeacherById = async (teacherId) => {
    const teacher = await Teacher.findById(teacherId).select("-password");
    if (!teacher) {
        throw new HttpError(404, { message: "Teacher not found" });
    }
    return { teacher };
};

const updateTeacher = async (teacherId, data) => {
    const { name, email, password, phone_no, address, qualification, experiencedYears } = data;

    const existingTeacher = await Teacher.findOne({ _id: teacherId });
    if (!existingTeacher) {
        throw new HttpError(404, { message: "Teacher not found" });
    }

    existingTeacher.name = name || existingTeacher.name;
    existingTeacher.email = email || existingTeacher.email;
    existingTeacher.phone_no = phone_no || existingTeacher.phone_no;
    existingTeacher.address = address || existingTeacher.address;
    existingTeacher.qualification = qualification || existingTeacher.qualification;
    existingTeacher.experiencedYears = experiencedYears || existingTeacher.experiencedYears;

    if (password) {
        existingTeacher.password = await hashPassword(password);
    }

    await existingTeacher.save();

    return {
        message: "Teacher updated successfully",
        teacher: existingTeacher,
    };
};

module.exports = {
    registerTeacher,
    loginTeacher,
    getTeacherById,
    updateTeacher,
};
