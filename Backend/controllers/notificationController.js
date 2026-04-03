const Notification = require("../models/Notification");
const Student = require("../models/Student");
const NotificationStatus = require("../models/NotificationStatus");

// CREATE
exports.createNotification = async (req, res) => {
    try {
        const { title, message, type, classId } = req.body;

        const notification = await Notification.create({
            title,
            message,
            type,
            classId: type === "class" ? classId : null,
            createdBy: req.user.id,
        });

        let students;

        if (type === "class") {
            students = await Student.find({ classId });
        } else {
            students = await Student.find(); // all students
        }
        const statusDocs = student.map((s) => ({
            notificationId: notification._id,
            studentId: s._id,
        }));

        await NotificationStatus.insertMany(statusDocs);

        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET
exports.getNotifications = async (req, res) => {
    try {
        const { role, id } = req.user;

        if (role === "teacher") {
            const data = await Notification.find().sort({ createdAt: -1 });
            return res.json(data);
        }

        if (role === "student") {
            const student = await Student.findById(id);
            const status = await NotificationStatus.find({ studentId: id });

            const data = await Notification.find({
                $or: [
                    { type: "general" },
                    { type: "class", classId: student.classId },
                ],
            }).sort({ createdAt: -1 });

            return res.json(data);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};