const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    console.log("AuthMiddleware: Checking for token in headers", req.headers.authorization );
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.teacherId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;
