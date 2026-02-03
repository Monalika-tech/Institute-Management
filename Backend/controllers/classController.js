const Classes = require("../models/classModel");

// create a new class
const createClass = async (req, res) => {
    try {
        const { classLevel, totalStudent, batchTime } = req.body;

        const existingClass = await Classes.findOne({ classLevel , teacherID : req.user._id});

        if (existingClass) {
            return res.status(400).json({
                message: "Class already exists",
            });
        }

        const newClass = new Classes({
            classLevel,
            batchTime,
            teacherID: req.user._id
        });

        await newClass.save();

        res.status(201).json({
            message: "Class created successfully",
            class: newClass,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// update class details
const updateClass = async (req, res) => {
    try {

        const { classLevel } = req.params;
        const { totalStudent, batchTime } = req.body;

        const existingClass = await Classes.findOne({ classLevel });


        if (!existingClass) {
            return res.status(404).json({ message: "Class not found" });

        }

        existingClass.totalStudent = totalStudent || existingClass.totalStudent;
        existingClass.batchTime = batchTime || existingClass.batchTime;
        await existingClass.save();

        return res.status(200).json({
            message: "Class updated",
            class: existingClass,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });

    }
};

// get all the classes for class list 
const getAllClasses = async (req, res) => {
    try {
        const logTeacherID = req.user._id;

        const classes = await Classes.find({teacherID : logTeacherID });
        res.status(200).json({
            message: "Classes retrieved successfully",
            classes,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// delete class
const deleteClass = async (req, res) =>{
    try {
        const { _id } = req.params;
        // const _id = req.body;
        console.log("Deleting class with ID on server side:", _id);

        const classData = await Classes.findOne({ _id });
        if(!classData){
            return res.status(404).json({message : "CLass not found "});
        }
        await Classes.deleteOne({_id});
        return res.status(200) .json({message : "Class deleted successfully",
            class : classData
        });
    } catch (error) {
        res.status(500).json({
            message : "Server Error",
            error : error.message
        }); 
    }
}

// get class for class dasboard by classlevel
const getclassById = async (req, res) => {
    try {

        const { _id } = req.params;
        const classData = await Classes.findOne({ _id });
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        return res.status(200).json({
            message: "Class Found!",
            class: classData
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }


};

module.exports = { createClass, updateClass, getclassById, getAllClasses , deleteClass};
