"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdateOneById = findAndUpdateOneById;
exports.findAndUpdateOne = findAndUpdateOne;
const mongoose_1 = require("mongoose");
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const services_1 = require("../../services");
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
const errors_1 = require("../../../utilities/errors");
function findAndUpdateOneById(model, options = { new: true, runValidators: true }) {
    return async (req, res, next) => {
        try {
            const objectId = req.params?.id;
            const doc = await (0, services_1.findAndUpdateByResourceId)(model, { _id: objectId }, req?.body, options);
            return !doc ? api_responses_1.default.notFoundResponse(res, `${model.modelName.toLowerCase()} not found`) : api_responses_1.default.successResponseWithData(res, doc, 200, '');
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
function findAndUpdateOne(model, query, updateData, options = { new: true, runValidators: true }) {
    return async (req, res, next) => {
        try {
            const doc = await (0, services_1.findAndUpdateOneResource)(model, query, updateData, options);
            return !doc ? api_responses_1.default.notFoundResponse(res, `${model.modelName.toLowerCase()} not found`) : api_responses_1.default.successResponseWithData(res, doc, 200, '');
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
//# sourceMappingURL=update.controller.js.map