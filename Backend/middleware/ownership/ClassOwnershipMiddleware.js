const Classes = require("../../models/classModel");


console.log("n class Ownership ..");
const classOwnership = async (req, res, next) => {
    try {
        // logged in user
        const user = req.user;
        // resource accessed
        const classId = req.params._id;

        if (user.role === 'admin') {
            next();
        }


        if (user.role !== 'teacher') {
            return res.status(403).json({
                message: "Access denied! "
            })
        }

        // route - create calss or get all classes.
        if (!classId) {
            next();
        }

        // and if clsssId found find class route- get, put , delete 

        const cls = await Classes.findById(classId)
        if (!cls) {
            return res.status(404).json({
                message: "class not found!"
            });
        }

        // if found then match the id's 
        if (cls.teacherID !== user._id) {
            return res.status(403).json({
                message: "Access denied! You do not own this data "
            })
        }
        req.cls = cls;
        next();

    } catch (error) {
        return res.status(500).json({ message: "class ownership fail ", error: error.message });

    }
};

module.exports = classOwnership;