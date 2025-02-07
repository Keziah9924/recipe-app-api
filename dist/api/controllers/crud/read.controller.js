"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.getDocumentCount = getDocumentCount;
exports.findOne = findOne;
exports.findById = findById;
const mongoose_1 = require("mongoose");
const services_1 = require("../../services");
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
const errors_1 = require("../../../utilities/errors");
function findAll(model, populateOptions) {
    return async (req, res, next) => {
        try {
            const query = req.body;
            const filterQuery = query ? { ...query } : {};
            const doc = await (0, services_1.findAllResources)(model, filterQuery, populateOptions);
            return api_responses_1.default.successResponseWithData(res, doc, 200, '');
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
async function getDocumentCount(model) {
    return async (req, res, next) => {
        try {
            const doc = await (0, services_1.countDocuments)(model, req?.body);
            return api_responses_1.default.successResponseWithData(res, doc, 200, 'Total Number of documents for ' + model.modelName.toLowerCase());
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
function findOne(model, options, populateOptions) {
    return async (req, res, next) => {
        try {
            const doc = await (0, services_1.findOneResource)(model, req?.body, options, populateOptions);
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
function findById(model, options, populateOptions) {
    return async (req, res, next) => {
        try {
            const doc = await (0, services_1.findByResourceId)(model, req.params.id, options, populateOptions);
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
//# sourceMappingURL=read.controller.js.map