const ownership = (req, res, next) => {
    const loggedUser = req.user;

    const requestedStudID = req.params._id;

    if (loggedUser.role === 'teacher') {
        return next();
    }


    console.log("Ownership middleware ...");
    if (loggedUser.role === 'student' && loggedUser._id.toString() === requestedStudID) {
        return next();
    }

    return res.status(403).json({
        message: "Access denied : you don't have ownership over this resource"
    })

};

module.exports = ownership;