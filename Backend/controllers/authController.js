const { handleController } = require("../utils/handleController");
const cookieOptions = require("../config/cookieOption");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const { signAccessToken } = require("../utils/token");


const getMe =
    async (req, res) => {
        let user;

        if (req.user.role === "teacher") {
            user =
                await Teacher.findById(
                    req.user._id
                ).select("-password");
        }
        else {
            user =
                await Student.findById(
                    req.user._id
                ).select("-password");

        }

        res.status(200).json({
            userId: req.user._id,
            role: req.user.role,
            user,
        });
    };

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "No refresh token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );

        const accessToken = signAccessToken({
            id: decoded.id,
            role: decoded.role
        });

        return res.status(200).cookie("accessToken", accessToken, cookieOptions).json({
            message: "Token refreshed",
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid refresh token",
            error: error.message
        });
    }
};

const logout =
    (req, res) => {

        res.clearCookie(
            "accessToken",
            cookieOptions
        );

        res.clearCookie(
            "refreshToken",
            cookieOptions
        );

        res.status(200).json({
            message: "Logout Successful"
        });
    };

module.exports = {
    getMe,
    refreshToken,
    logout
};