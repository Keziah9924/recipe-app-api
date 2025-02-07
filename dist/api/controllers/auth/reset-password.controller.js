"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
const errors_1 = require("../../../utilities/errors");
const resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const doc = await (0, services_1.findAndUpdateOneResource)(user_model_1.default, { email }, { password }, { new: true, runValidators: true });
        return api_responses_1.default.successResponseWithData(res, { [user_model_1.default.modelName]: doc }, 200, `${user_model_1.default.modelName} password reset successful`);
    }
    catch (error) {
        if (error instanceof mongoose_1.MongooseError) {
            const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
            return res.status(mongooseResponse.code).json({ error: mongooseResponse });
        }
        return next(errors_1.APIError.BadRequest(error));
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=reset-password.controller.js.map