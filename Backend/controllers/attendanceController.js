const attendance = require("../models/attendanceModel");

// mark attendance for a class on a specific date
const markAttendance = async (req, res) => {
    try {
        const { classId, teacherId, date, records } = req.body;

        const existingRecord = await attendance.findOne({ classId, date });

        if (existingRecord) {
            return res.status(400).json({
                message: "Attendance already marked for this class on this date",
            });
        }
        const newAttendance = new attendance({
            classId,
            teacherId,
            date,
            records
        });
        await newAttendance.save();

        res.status(201).json({
            message: "Attendance marked successfully",
            data: newAttendance
        });
    } catch (error) {
        res.status(500).json({
            message: "Error marking attendance",
            error: error.message
        });
    }
};

const getAttendanceByClassAndDate = async (req, res) => {
    try {
        const { classId, date } = req.query;
        const attendanceRecord = await attendance.findOne({ classId, date })
            .populate("records.studentId", "name");

        res.status(200).json({
            message: "Attendance record fetched",
            data: attendanceRecord
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching attendance record",
            error: error.message
        });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { records } = req.body;

        const updated = await Attendance.findByIdAndUpdate(
            id,
            { records },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getStudentAttendanceStats = async (req, res) => {
    const { studentId } = req.params;

    const data = await attendance.aggregate([
        { $unwind: "$records" },
        { $match: { "records.studentId": mongoose.Types.ObjectId(studentId) } },
        {
            $group: {
                _id: "$records.status",
                count: { $sum: 1 },
            },
        },
    ]);

    res.json(data);
};

module.exports = {
    markAttendance,
    getAttendanceByClassAndDate,
    updateAttendance,
    getStudentAttendanceStats
};