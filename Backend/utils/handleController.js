const { HttpError } = require("../services/errors");

const handleController = (handler, options = {}) => {
    const { serverErrorBody = (message) => ({ message: "Server Error", error: message }) } = options;

    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).json(error.body);
            }
            const body = serverErrorBody(error.message);
            return res.status(500).json(body);
        }
    };
};

module.exports = { handleController };
