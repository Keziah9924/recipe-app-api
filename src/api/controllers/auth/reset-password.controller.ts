import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../../utilities/api-responses";
import UserModel from "../../models/user.model";
import { findAndUpdateOneResource } from "../../services";
import { MongooseError } from "mongoose";
import { MongooseErrorHandler } from "../../../utilities/errors/mongoose-error";
import { APIError } from "../../../utilities/errors";

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const doc = await findAndUpdateOneResource(UserModel, { email }, { password }, { new: true, runValidators: true })
        return ApiResponse.successResponseWithData(res, { [UserModel.modelName]: doc }, 200, `${UserModel.modelName} password reset successful`)
    } catch (error: any) {
        if (error instanceof MongooseError) {
            const mongooseResponse = MongooseErrorHandler.handle(error)!;
            return res.status(mongooseResponse.code).json({ error: mongooseResponse })
        }
        return next(APIError.BadRequest(error));
    }
}
export { resetPassword };