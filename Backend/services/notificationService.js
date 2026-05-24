const Notification = require("../models/notificationModels");
const Student = require("../models/studentModel");
const NotificationStatus = require("../models/notificationStatusModel");
const { HttpError } = require("./errors");

const priorityOrder = {
    urgent: 3,
    important: 2,
    normal: 1,
};

const getUserId = (user) => user?.id ?? user?._id;

const createNotification = async (data, user) => {
    const { title, message, type, classId, priority, expiresAt } = data;

    const notification = await Notification.create({
        title,
        message,
        type,
        classId: type === "class" ? classId : null,
        priority,
        expiresAt,
        createdBy: getUserId(user),
    });

    let students;
    if (type === "class") {
        students = await Student.find({ classID: classId });
    } else {
        students = await Student.find();
    }

    const statusDocs = students.map((s) => ({
        notificationId: notification._id,
        studentId: s._id,
    }));

    await NotificationStatus.insertMany(statusDocs);

    return notification;
};

const getNotifications = async (user) => {
    const { role } = user;
    const userId = getUserId(user);

    if (role === "teacher") {
        return Notification.find().sort({ createdAt: -1 });
    }

    if (role === "student") {
        const student = await Student.findById(userId);
        if (!student) {
            return [];
        }
        const now = new Date();

        const data = await Notification.find({
            $and: [
                {
                    $or: [
                        { type: "general" },
                        { type: "class", classId: student.classID },
                    ],
                },
                {
                    $or: [
                        { expiresAt: { $exists: false } },
                        { expiresAt: null },
                        { expiresAt: { $gt: now } },
                    ],
                },
            ],
        });

        const statusList = await NotificationStatus.find({ studentId: userId });
        const statusMap = {};
        statusList.forEach((s) => {
            statusMap[s.notificationId.toString()] = s;
        });

        const notificationsWithStatus = data.map((n) => ({
            ...n._doc,
            isRead: statusMap[n._id.toString()]
                ? statusMap[n._id.toString()].isRead
                : false,
        }));

        notificationsWithStatus.sort((a, b) => {
            if (priorityOrder[b.priority] === priorityOrder[a.priority]) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        return notificationsWithStatus;
    }

    return [];
};

const getUnreadCount = async (user) => {
    const userId = getUserId(user);
    const count = await NotificationStatus.countDocuments({
        studentId: userId,
        isRead: false,
    });
    return { unreadCount: count };
};

const markAsRead = async (notificationId, user) => {
    const studentId = getUserId(user);

    const notificationStatus = await NotificationStatus.findOne({
        notificationId,
        studentId,
    });

    if (!notificationStatus) {
        throw new HttpError(404, { message: "Notification status not found" });
    }

    notificationStatus.isRead = true;
    notificationStatus.readAt = new Date();
    await notificationStatus.save();

    return { message: "Notification marked as read" };
};

module.exports = {
    createNotification,
    getNotifications,
    getUnreadCount,
    markAsRead,
};
