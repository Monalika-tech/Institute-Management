const classService = require("../services/classService");
const { handleController } = require("../utils/handleController");

const createClass = handleController(async (req, res) => {
    const result = await classService.createClass(req.body, req.user._id);
    res.status(result.statusCode).json(result.body);
});

const updateClass = handleController(async (req, res) => {
    const result = await classService.updateClass(req.params._id, req.body);
    res.status(200).json(result);
});

const getAllClasses = handleController(async (req, res) => {
    const result = await classService.getAllClasses(req.user._id);
    res.status(200).json(result);
});

const deleteClass = handleController(async (req, res) => {
    const result = await classService.deleteClass(req.params._id);
    res.status(200).json(result);
});

const getclassById = handleController(async (req, res) => {
    const result = await classService.getClassById(req.params._id);
    res.status(200).json(result);
});

module.exports = { createClass, updateClass, getclassById, getAllClasses, deleteClass };
