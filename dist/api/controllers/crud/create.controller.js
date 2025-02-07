"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOne = createOne;
const mongoose_1 = require("mongoose");
const services_1 = require("../../services");
const errors_1 = require("../../../utilities/errors");
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const mongoose_error_1 = require("../../../utilities/errors/mongoose-error");
function createOne(model, options) {
    return async (req, res, next) => {
        try {
            const doc = await (0, services_1.createOneResource)(model, req.body, options);
            return api_responses_1.default.successResponseWithData(res, { [model.modelName.toLowerCase()]: doc }, 201, `${model.modelName} created`);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError) {
                const mongooseResponse = mongoose_error_1.MongooseErrorHandler.handle(error);
                return res.status(mongooseResponse.code).json({ error: mongooseResponse });
            }
            if (error.code === 11000)
                return api_responses_1.default.alreadyExistResponse(res, `${model.modelName} already exists`);
            return next(errors_1.APIError.BadRequest(error));
        }
    };
}
//# sourceMappingURL=create.controller.js.map