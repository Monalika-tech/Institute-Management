class HttpError extends Error {
    constructor(statusCode, body) {
        super(body?.message || "Request failed");
        this.statusCode = statusCode;
        this.body = body;
    }
}

module.exports = { HttpError };
