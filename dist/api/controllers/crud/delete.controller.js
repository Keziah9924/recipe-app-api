"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndDeleteOneById = findAndDeleteOneById;
exports.deleteOne = deleteOne;
exports.deleteAll = deleteAll;
const mongoose_1 = require("mongoose");
const services_1 = require("../../services");
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
const errors_1 = require("../../../utilities/errors");
function findAndDeleteOneById(model) {
    return async (req, res, next) => {
        try {
            const id = req.params?.id;
            await (0, services_1.findAndDeleteOneByResourceId)(model, id);
            return api_responses_1.default.successResponse(res, 200, `${model.modelName.toLowerCase()} removed successfully`);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError) {
                const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
                return res.status(mongooseResponse.code).json({ error: mongooseResponse });
            }
            return next(errors_1.APIError.BadRequest(error));
        }
    };
}
function deleteOne(model, options) {
    return async (req, res, next) => {
        try {
            await (0, services_1.deleteOneResource)(model, req?.body, options);
            return api_responses_1.default.successResponse(res, 200, `${model.modelName.toLowerCase()} removed successfully`);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError) {
                const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
                return res.status(mongooseResponse.code).json({ error: mongooseResponse });
            }
            return next(errors_1.APIError.BadRequest(error));
        }
    };
}
function deleteAll(model, options) {
    return async (req, res, next) => {
        try {
            await (0, services_1.deleteAllResources)(model, req?.body, options);
            return api_responses_1.default.successResponse(res, 200, `${model.modelName.toLowerCase()}s  removed successfully`);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError) {
                const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
                return res.status(mongooseResponse.code).json({ error: mongooseResponse });
            }
            return next(errors_1.APIError.BadRequest(error));
        }
    };
}
//# sourceMappingURL=delete.controller.js.map