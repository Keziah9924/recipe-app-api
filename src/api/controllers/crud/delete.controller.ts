import { Model, QueryOptions, ObjectId, MongooseError } from 'mongoose'
import { NextFunction, Request, Response } from "express";
import { deleteOneResource, findAndDeleteOneByResourceId, deleteAllResources } from "../../services";
import ApiResponse from "../../../utilities/api-responses";
import { MongooseErrorHandler } from "../../../utilities/errors/mongoose-error";
import { APIError } from "../../../utilities/errors";

export function findAndDeleteOneById<T>(model: Model<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: ObjectId | string = req.params?.id
            await findAndDeleteOneByResourceId(model, id)
            return ApiResponse.successResponse(res, 200, `${model.modelName.toLowerCase()} removed successfully`)
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}

export function deleteOne<T>(model: Model<T>, options?: QueryOptions<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await deleteOneResource(model, req?.body, options)
            return ApiResponse.successResponse(res, 200, `${model.modelName.toLowerCase()} removed successfully`)
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}

export function deleteAll<T>(model: Model<T>, options?: QueryOptions<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteAllResources(model, req?.body, options)
            return ApiResponse.successResponse(res, 200, `${model.modelName.toLowerCase()}s  removed successfully`)
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}