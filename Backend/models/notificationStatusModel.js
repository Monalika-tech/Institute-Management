// models/NotificationStatus.js
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    isRead: { type: Boolean, default: false },
    readAt: Date,
});

module.exports = mongoose.model("NotificationStatus", statusSchema);