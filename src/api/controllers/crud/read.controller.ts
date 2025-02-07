import {
    Model, MongooseError,
    QueryOptions
} from 'mongoose'
import { NextFunction, Request, Response } from "express";
import { findOneResource, findByResourceId, findAllResources, countDocuments } from "../../services";
import ApiResponse from "../../../utilities/api-responses";
import { MongooseErrorHandler } from "../../../utilities/errors/mongoose-error";
import { APIError } from "../../../utilities/errors";

export function findAll<T>(model: Model<T>, populateOptions?: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.body;
            const filterQuery =  query ? {...query} : {} ;
            
            const doc = await findAllResources(model, filterQuery, populateOptions)
            return ApiResponse.successResponseWithData(res, doc, 200, '')
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}

export async function getDocumentCount<T>(model: Model<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doc = await countDocuments(model, req?.body)
            return ApiResponse.successResponseWithData(res, doc, 200, 'Total Number of documents for ' + model.modelName.toLowerCase())
        } catch (error: any) {
            if (error instanceof MongooseError) {
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({ error: mongooseResponse })
            }
            return next(APIError.BadRequest(error));
        }
    }
}

export function findOne<T>(model: Model<T>, options?: QueryOptions<T>, populateOptions?:any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doc = await findOneResource(model, req?.body, options, populateOptions)
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

export function findById<T>(model: Model<T>, options?: QueryOptions, populateOptions?: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doc = await findByResourceId(model, req.params.id, options, populateOptions)
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