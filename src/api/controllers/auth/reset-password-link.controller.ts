import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../../utilities/api-responses";
import { MongooseError } from "mongoose";
import { MongooseErrorHandler } from "../../../utilities/errors/mongoose-error";
import { APIError } from "../../../utilities/errors";
import { sendMail } from "../../../utilities/mailer";
import { templates } from "../../../utilities/mailer/templates";
import { createAccessToken } from "../../../utilities/jwt";

const resetPasswordLink = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email } = req.body;

        const verificationToken = createAccessToken({ email })
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${verificationToken}`

        const sendResponse = await sendMail(email, templates({ resetLink }, 'reset-password'));
        if (sendResponse.accepted) return ApiResponse.successResponseWithData(res, verificationToken, 200, 'We sent you a code to verify your account')
        else return ApiResponse.errorResponse(res, 500, 'Could not send email.')

    } catch (error: any) {
        if (error instanceof MongooseError) {
            const mongooseResponse = MongooseErrorHandler.handle(error)!;
            return res.status(mongooseResponse.code).json({ error: mongooseResponse })
        }
        return next(APIError.BadRequest(error));
    }
}

export { resetPasswordLink };
