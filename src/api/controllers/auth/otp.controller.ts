import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../../utilities/api-responses";
import { MongooseError } from "mongoose";
import { MongooseErrorHandler } from "../../../utilities/errors/mongoose-error";
import { APIError } from "../../../utilities/errors";
import { sendMail } from "../../../utilities/mailer";
import { templates } from "../../../utilities/mailer/templates";
import { createAccessToken } from "../../../utilities/jwt";

const otp = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, firstname } = req.body;

        const generateOTP = (): number => {
            const otp: number = Math.floor(100000 + Math.random() * 900000);
            return otp;
        };

        const otp = generateOTP();
        const sendResponse = await sendMail(email, templates({ firstname, otp }, 'verify-account'));
        console.log(sendResponse)
        if (sendResponse.accepted) return ApiResponse.successResponseWithData(res, createAccessToken({ email, otp }), 200, 'We sent you a code to verify your account')
        else return ApiResponse.errorResponse(res, 500, 'Could not send email.')

    } catch (error: any) {
        if (error instanceof MongooseError) {
            const mongooseResponse = MongooseErrorHandler.handle(error)!;
            return res.status(mongooseResponse.code).json({ error: mongooseResponse })
        }
        return next(APIError.BadRequest(error.message));
    }
}

export { otp };
