const teacherService = require("../services/teacherService");
const { handleController } = require("../utils/handleController");

const RegisterTeacher = handleController(async (req, res) => {
    const result = await teacherService.registerTeacher(req.body);
    res.status(result.statusCode).json(result.body);
});

const LoginTeacher = handleController(async (req, res) => {
    const result = await teacherService.loginTeacher(req.body);
    res.status(result.statusCode).json(result.body);
});

const GetTeacherById = handleController(async (req, res) => {
    const result = await teacherService.getTeacherById(req.params._id);
    res.status(200).json(result);
});

const updateTeacher = handleController(async (req, res) => {
    const result = await teacherService.updateTeacher(req.params._id, req.body);
    res.status(200).json(result);
});

module.exports = {
    LoginTeacher,
    RegisterTeacher,
    GetTeacherById,
    updateTeacher,
};
