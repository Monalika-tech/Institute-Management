const jwt = require("jsonwebtoken");

const signAccessToken = ({ id, role }) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

const signRefreshToken = ({ id, role }) => {
    return jwt.sign(
        { id, role },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

module.exports = {
    signAccessToken,
    signRefreshToken,
};