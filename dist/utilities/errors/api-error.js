"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    constructor(name, message, HTTPStatus = 500, isTrusted = true) {
        super(message);
        this.name = name;
        this.message = message;
        this.HTTPStatus = HTTPStatus;
        this.isTrusted = isTrusted;
    }
    static BadRequest(...args) {
        if (args.length === 2) {
            const [name, message] = args;
            return new APIError(name, message, 400);
        }
        const errorToHandle = args[0];
        return new APIError(errorToHandle.name, errorToHandle.message, 400);
    }
    static Unauthorized(name, msg) {
        return new APIError(name, msg, 401);
    }
    static Forbidden(name, msg) {
        return new APIError(name, msg, 403);
    }
    static NotFound(name, msg) {
        return new APIError(name, msg, 404);
    }
    static MethodNotAllowed(name, msg) {
        return new APIError(name, msg, 405);
    }
}
exports.default = APIError;
//# sourceMappingURL=api-error.js.map