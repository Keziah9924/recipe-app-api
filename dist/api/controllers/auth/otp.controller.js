"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otp = void 0;
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const mongoose_1 = require("mongoose");
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
const errors_1 = require("../../../utilities/errors");
const mailer_1 = require("../../../utilities/mailer");
const templates_1 = require("../../../utilities/mailer/templates");
const jwt_1 = require("../../../utilities/jwt");
const otp = async (req, res, next) => {
    try {
        const { email, firstname } = req.body;
        const generateOTP = () => {
            const otp = Math.floor(100000 + Math.random() * 900000);
            return otp;
        };
        const otp = generateOTP();
        const sendResponse = await (0, mailer_1.sendMail)(email, (0, templates_1.templates)({ firstname, otp }, 'verify-account'));
        console.log(sendResponse);
        if (sendResponse.accepted)
            return api_responses_1.default.successResponseWithData(res, (0, jwt_1.createAccessToken)({ email, otp }), 200, 'We sent you a code to verify your account');
        else
            return api_responses_1.default.errorResponse(res, 500, 'Could not send email.');
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
            return res.status(mongooseResponse.code).json({ error: mongooseResponse });
        }
        return next(errors_1.APIError.BadRequest(error.message));
    }
};
exports.otp = otp;
//# sourceMappingURL=otp.controller.js.map