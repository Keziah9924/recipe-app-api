import { NextFunction, Request, Response } from 'express'
import { Model, MongooseError, SaveOptions } from 'mongoose'
import {createOneResource} from '../../services'
import { APIError } from '../../../utilities/errors'
import ApiResponse from '../../../utilities/api-responses'
import { MongooseErrorHandler } from '../../../utilities/errors/mongoose-error'

 export function createOne<T>(model: Model<T>, options?: SaveOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doc = await createOneResource(model, req.body, options)
            return ApiResponse.successResponseWithData(res, { [model.modelName.toLowerCase()]: doc }, 201, `${model.modelName} created`)
		} catch (error: any) {
            if (error instanceof MongooseError){
                const mongooseResponse = MongooseErrorHandler.handle(error)!;
                return res.status(mongooseResponse.code).json({error: mongooseResponse})
            }
            if (error.code === 11000) return ApiResponse.alreadyExistResponse(res, `${model.modelName} already exists`)
			return next(APIError.BadRequest(error));
		}
	}
}