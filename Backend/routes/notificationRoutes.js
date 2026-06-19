const express = require("express");
const router = express.Router();
const {
    createNotification,
    getNotifications, getUnreadCount,
    markAsRead,
} = require("../controllers/notificationController");

const protect = require('../middleware/AuthMiddleware');
const authorize = require('../middleware/AuthorisedMiddleware');
router.post("/", protect, authorize("teacher"), createNotification);
router.get("/", protect, getNotifications);
router.get("/unread-count", protect, authorize("student"), getUnreadCount);
router.post("/:id/mark-read", protect, authorize("student"), markAsRead);
module.exports = router;