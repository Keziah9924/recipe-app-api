import {
    Model,
    QueryOptions, MongooseError, FilterQuery, UpdateQuery
} from 'mongoose'
import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utilities/api-responses";
import { findAndUpdateByResourceId, findAndUpdateOneResource } from "../../services";
import { MongooseErrorHandler } from "../../../utilities/errors/mongoose-error";
import { APIError } from "../../../utilities/errors";

export function findAndUpdateOneById<T>(model: Model<T>, options: QueryOptions<T> = { new: true, runValidators: true }) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const objectId = req.params?.id
            const doc = await findAndUpdateByResourceId(model, { _id: objectId }, req?.body, options)
            return !doc ? ApiResponse.notFoundResponse(res, `${model.modelName.toLowerCase()} not found`) : ApiResponse.successResponseWithData(res, doc, 200, '')
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}

export function findAndUpdateOne<T>(model: Model<T>, query: FilterQuery<T>, updateData: UpdateQuery<T>, options: QueryOptions<T> = { new: true, runValidators: true }) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const doc = await findAndUpdateOneResource(model, query, updateData, options)
            return !doc ? ApiResponse.notFoundResponse(res, `${model.modelName.toLowerCase()} not found`) : ApiResponse.successResponseWithData(res, doc, 200, '')
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}