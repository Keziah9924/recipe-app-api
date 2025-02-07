import { Request, Response, NextFunction } from "express";
import ApiResponses from "../../../utilities/api-responses";
import { findOneResource } from '../../services'
import UserModel from "../../models/user.model";
import bcrypt from 'bcrypt'
import { createAccessToken } from "../../../utilities/jwt";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!password) return ApiResponses.errorResponse(res, 401, 'Email and password required');

        const user = await findOneResource(UserModel, { email: email });

        if (!user) return ApiResponses.notFoundResponse(res, `${UserModel.modelName.toLowerCase()} not found`);

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        const { password: _, __v, ...tokenData } = user;
        const accessToken = createAccessToken({ ...tokenData })

        return isPasswordMatch ? res.status(200).json({code: 200,message: 'Login successful!',token: accessToken}) :
            ApiResponses.errorResponse(res, 400, 'Email or password incorrect');

    } catch (error) {
        return next(error);
    }
}

export { loginUser };