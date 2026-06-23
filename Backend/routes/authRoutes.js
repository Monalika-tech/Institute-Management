const express = require("express");
const { getMe, refreshToken, logout } = require("../controllers/authController");
const router = express.Router();
const protect = require("../middleware/AuthMiddleware");



router.get("/me", protect, getMe);

router.post("/refresh", refreshToken);

router.post(
    "/logout",
    logout
);

module.exports = router;