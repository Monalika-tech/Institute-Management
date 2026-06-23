const Classes = require("../models/classModel");
const { HttpError } = require("../utils/errors");

const createClass = async (data, teacherId) => {
    const { classLevel, batchTime } = data;

    const existingClass = await Classes.findOne({ classLevel, teacherID: teacherId });
    if (existingClass) {
        throw new HttpError(400, { message: "Class already exists" });
    }

    const newClass = new Classes({
        classLevel,
        batchTime,
        teacherID: teacherId,
    });
    await newClass.save();

    return {
        statusCode: 201,
        body: {
            message: "Class created successfully",
            class: newClass,
        },
    };
};

const updateClass = async (classId, data) => {
    const { totalStudent, batchTime } = data;

    const existingClass = await Classes.findOne({ _id: classId });
    if (!existingClass) {
        throw new HttpError(404, { message: "Class not found" });
    }

    existingClass.totalStudent = totalStudent || existingClass.totalStudent;
    existingClass.batchTime = batchTime || existingClass.batchTime;
    await existingClass.save();

    return {
        message: "Class updated",
        class: existingClass,
    };
};

const getAllClasses = async (teacherId) => {
    const classes = await Classes.find({ teacherID: teacherId });
    return {
        message: "Classes retrieved successfully",
        classes,
    };
};

const deleteClass = async (classId) => {
    const classData = await Classes.findOne({ _id: classId });
    if (!classData) {
        throw new HttpError(404, { message: "CLass not found " });
    }

    await Classes.deleteOne({ _id: classId });

    return {
        message: "Class deleted successfully",
        class: classData,
    };
};

const getClassById = async (classId) => {
    const classData = await Classes.findOne({ _id: classId });
    if (!classData) {
        throw new HttpError(404, { message: "Class not found" });
    }

    return {
        message: "Class Found!",
        class: classData,
    };
};

module.exports = {
    createClass,
    updateClass,
    getAllClasses,
    deleteClass,
    getClassById,
};
