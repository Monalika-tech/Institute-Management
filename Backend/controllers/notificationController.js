const notificationService = require("../services/notificationService");
const { handleController } = require("../utils/handleController");

const notificationErrorBody = (message) => ({ message });

exports.createNotification = handleController(async (req, res) => {
    const notification = await notificationService.createNotification(req.body, req.user);
    res.status(201).json(notification);
}, { serverErrorBody: notificationErrorBody });

exports.getNotifications = handleController(async (req, res) => {
    const data = await notificationService.getNotifications(req.user);
    res.json(data);
}, { serverErrorBody: notificationErrorBody });

exports.getUnreadCount = handleController(async (req, res) => {
    const result = await notificationService.getUnreadCount(req.user);
    res.json(result);
}, { serverErrorBody: notificationErrorBody });

exports.markAsRead = handleController(async (req, res) => {
    const notificationId = req.params.id || req.params._id;
    const result = await notificationService.markAsRead(notificationId, req.user);
    res.json(result);
}, { serverErrorBody: notificationErrorBody });
