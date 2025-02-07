import { NextFunction, Request, Response } from "express";
import InvoiceModel from "../api/models/invoice.model";
import ApiResponse from '../utilities/api-responses'
import { MongooseErrorHandler } from '../utilities/errors/mongoose-error'
import { findAndUpdateByResourceId } from "../api/services";
import { MongooseError } from "mongoose";
import { APIError } from "../utilities/errors";

export = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const invoice = req.body.invoice
            if (Object.keys(invoice).length === 0) return next();
            const invoice_id = req.body.invoice_id
            const doc = await findAndUpdateByResourceId(InvoiceModel, { _id: invoice_id }, invoice, {})
            if (doc) return ApiResponse.successResponseWithData(res, doc, 200, '')
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}