"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordLink = void 0;
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const mongoose_1 = require("mongoose");
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
const errors_1 = require("../../../utilities/errors");
const mailer_1 = require("../../../utilities/mailer");
const templates_1 = require("../../../utilities/mailer/templates");
const jwt_1 = require("../../../utilities/jwt");
const resetPasswordLink = async (req, res, next) => {
    try {
        const { email } = req.body;
        const verificationToken = (0, jwt_1.createAccessToken)({ email });
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${verificationToken}`;
        const sendResponse = await (0, mailer_1.sendMail)(email, (0, templates_1.templates)({ resetLink }, 'reset-password'));
        if (sendResponse.accepted)
            return api_responses_1.default.successResponseWithData(res, verificationToken, 200, 'We sent you a code to verify your account');
        else
            return api_responses_1.default.errorResponse(res, 500, 'Could not send email.');
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
            return res.status(mongooseResponse.code).json({ error: mongooseResponse });
        }
        return next(errors_1.APIError.BadRequest(error));
    }
};
exports.resetPasswordLink = resetPasswordLink;
//# sourceMappingURL=reset-password-link.controller.js.map