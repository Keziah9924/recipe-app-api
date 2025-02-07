"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const invoice_model_1 = __importDefault(require("../api/models/invoice.model"));
const api_responses_1 = __importDefault(require("../utilities/api-responses"));
const mongoose_error_1 = require("../utilities/errors/mongoose-error");
const services_1 = require("../api/services");
const mongoose_1 = require("mongoose");
const errors_1 = require("../utilities/errors");
module.exports = () => {
    return async (req, res, next) => {
        try {
            const invoice = req.body.invoice;
            if (Object.keys(invoice).length === 0)
                return next();
            const invoice_id = req.body.invoice_id;
            const doc = await (0, services_1.findAndUpdateByResourceId)(invoice_model_1.default, { _id: invoice_id }, invoice, {});
            if (doc)
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
};
//# sourceMappingURL=edit-invoice.js.map