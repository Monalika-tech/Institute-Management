const studentService = require("../services/studentService");
const { handleController } = require("../utils/handleController");

const registerStudent = handleController(async (req, res) => {
    const result = await studentService.registerStudent(req.body, req.user._id);
    res.status(200).json(result);
});

const LoginStudent = handleController(async (req, res) => {
    const result = await studentService.loginStudent(req.body);
    res.status(200).json(result);
});

const deleteStudent = handleController(async (req, res) => {
    const result = await studentService.deleteStudent(req.params._id);
    res.status(200).json(result);
});

const updateStudent = handleController(async (req, res) => {
    const result = await studentService.updateStudent(req.params._id, req.body);
    res.status(200).json(result);
});

const getStudentById = handleController(async (req, res) => {
    const result = await studentService.getStudentById(req.params._id);
    res.status(200).json(result);
});

const getAllStudents = handleController(async (req, res) => {
    const result = await studentService.getAllStudents(req.user._id);
    res.status(200).json(result);
});

const getStudentByClass = handleController(async (req, res) => {
    const result = await studentService.getStudentByClass(req.user._id, req.params._id);
    res.status(200).json(result);
});

module.exports = {
    registerStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    LoginStudent,
    getStudentByClass,
};
