const express = require("express");
const authController = require("../controllers/authController");
const { logout } = require("../controllers/authController");
const router = express.Router();
const protect = require("../middleware/AuthMiddleware");


router.get(
    "/me",
    protect,
    authController.getMe
);

router.post(
    "/refresh",
    authController.refreshToken
);
router.post(
    "/logout",
    authController.logout
);