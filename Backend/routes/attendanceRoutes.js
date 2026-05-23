const express = require("express");
const { markAttendance, getAttendanceByClassAndDate, updateAttendance, getStudentAttendanceStats } = require("../controllers/attendanceController");
// const protect = require("../middleware/AuthMiddleware");
// const authorize = require("../middleware/authorisedMiddleware");
// const classOwnership = require("../middleware/ownership/ClassOwnershipMiddleware");


const router = express.Router();

// route to mark attendance for a class on a specific date
router.post("/", markAttendance);
// route to get attendance record for a class on a specific date (query: classId, date)
router.get("/", getAttendanceByClassAndDate);
// legacy path-param route
router.get("/:classId/:date", getAttendanceByClassAndDate);
// route to update attendance record by id
router.put("/:id", updateAttendance);
// route to get attendance stats for a student
router.get("/student/:studentId", getStudentAttendanceStats);

module.exports = router;
