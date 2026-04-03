const express = require("express");
const router = express.Router();
const {
    createNotification,
    getNotifications,
} = require("../controllers/notificationController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("teacher"), createNotification);
router.get("/", protect, getNotifications);

module.exports = router;