const jwt = require("jsonwebtoken");
console.log("In Authentication Middleware");
const protect = (req, res, next) => {

    try {
        let token;

        console.log("AuthMiddleware: Checking for token in headers", req.headers.authorization);

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")

        ) {
            token = req.headers.authorization.split(" ")[1];
        }else {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded token:", decoded);
        req.user = { _id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" , error : error.message});
    }
};

module.exports = protect;


// checking  - Is this request coming from a valid logged-in user? authentication 
