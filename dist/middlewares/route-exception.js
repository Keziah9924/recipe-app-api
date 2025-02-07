"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUrl = exports.ErrorHandler = void 0;
const logger_1 = __importDefault(require("../core/logger"));
const errors_1 = require("../utilities/errors");
const ErrorHandler = (error, _req, res) => {
    console.assert(error instanceof Error);
    if (error && typeof error === 'object') {
        if (error.isTrusted === undefined || error.isTrusted === null)
            error.isTrusted = true;
        errors_1.errorHandler.handleError(error);
        logger_1.default.error(error.message);
        return res.status(error?.HTTPStatus || 500).json({
            status: 'failed',
            error: {
                ...error,
                message: error.message,
            },
        });
    }
};
exports.ErrorHandler = ErrorHandler;
const InvalidUrl = (req, res) => {
    return res.status(404).json({ message: `URL ${req.url} does not exist.` });
};
exports.InvalidUrl = InvalidUrl;
//# sourceMappingURL=route-exception.js.map