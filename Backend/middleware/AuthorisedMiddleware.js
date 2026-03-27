// here we check whether the user is authorised to access a particular route or not based on role
console.log(" IN Authorization middleware ");
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("Authorisation middleware called with allowed roles: ", allowedRoles);
        console.log("User info from request: ", req.user);
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
        }

        next();
    };
};

module.exports = authorize;