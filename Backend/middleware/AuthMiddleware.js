const jwt = require("jsonwebtoken");
console.log("In Authentication Middleware");
const protect = (req, res, next) => {

    try {
        const token =
            req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            _id: decoded.id,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed", error: error.message });
    }
};

module.exports = protect;


// checking  - Is this request coming from a valid logged-in user? authentication 
