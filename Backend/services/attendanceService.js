const mongoose = require("mongoose");
const Attendance = require("../models/attendanceModel");
const { HttpError } = require("./errors");

const markAttendance = async (data) => {
    const { classId, teacherId, date, records } = data;

    const existingRecord = await Attendance.findOne({ classId, date });
    if (existingRecord) {
        throw new HttpError(400, {
            message: "Attendance already marked for this class on this date",
        });
    }

    const newAttendance = new Attendance({
        classId,
        teacherId,
        date,
        records,
    });
    await newAttendance.save();

    return {
        statusCode: 201,
        body: {
            message: "Attendance marked successfully",
            data: newAttendance,
        },
    };
};

const getAttendanceByClassAndDate = async ({ classId, date }) => {
    const attendanceRecord = await Attendance.findOne({ classId, date }).populate(
        "records.studentId",
        "name"
    );

    return {
        message: "Attendance record fetched",
        data: attendanceRecord,
    };
};

const updateAttendance = async (id, { records }) => {
    const updated = await Attendance.findByIdAndUpdate(id, { records }, { new: true });
    if (!updated) {
        throw new HttpError(404, { error: "Attendance record not found" });
    }
    return updated;
};

const getStudentAttendanceStats = async (studentId) => {
    return Attendance.aggregate([
        { $unwind: "$records" },
        { $match: { "records.studentId": new mongoose.Types.ObjectId(studentId) } },
        {
            $group: {
                _id: "$records.status",
                count: { $sum: 1 },
            },
        },
    ]);
};

module.exports = {
    markAttendance,
    getAttendanceByClassAndDate,
    updateAttendance,
    getStudentAttendanceStats,
};
