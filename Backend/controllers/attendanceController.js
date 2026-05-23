const attendanceService = require("../services/attendanceService");
const { handleController } = require("../utils/handleController");

const markAttendance = handleController(async (req, res) => {
    const result = await attendanceService.markAttendance(req.body);
    res.status(result.statusCode).json(result.body);
}, {
    serverErrorBody: (message) => ({
        message: "Error marking attendance",
        error: message,
    }),
});

const getAttendanceByClassAndDate = handleController(async (req, res) => {
    const result = await attendanceService.getAttendanceByClassAndDate(req.query);
    res.status(200).json(result);
}, {
    serverErrorBody: (message) => ({
        message: "Error fetching attendance record",
        error: message,
    }),
});

const updateAttendance = handleController(async (req, res) => {
    const updated = await attendanceService.updateAttendance(req.params.id, req.body);
    res.json(updated);
}, {
    serverErrorBody: (message) => ({ error: message }),
});

const getStudentAttendanceStats = handleController(async (req, res) => {
    const data = await attendanceService.getStudentAttendanceStats(req.params.studentId);
    res.json(data);
});

module.exports = {
    markAttendance,
    getAttendanceByClassAndDate,
    updateAttendance,
    getStudentAttendanceStats,
};
