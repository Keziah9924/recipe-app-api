//import { Request, Response, NextFunction } from 'express';
//import mongoose, { Types } from 'mongoose';
////import { findUser } from '../api/user/services';
//import { User } from '../types';
//import ApiResponse from '../utilities/api-responses';

//declare global {
//    namespace Express {
//        interface Request {
//            //user: {
//                id: mongoose.Types.ObjectId
//                isValidEmail: boolean
//                hashedpassword: string
//            //}
//        }
//    }
//}


//export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//        //if (!req.body.email) return ApiResponse.errorResponse(res, 'Could not query user. Filter key missing','User email or id not found')
        
//        const user: User | null = await findUser({ _id: req.params.id });

//        if (user)
//            return ApiResponse.alreadyExistResponse(res, 'User already exists');
//        else next();
//    } catch (error) {
//        return next(error);
//    }
//};

//export const checkUserNotExists = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//        const user: User | null = await findUser({email: req.body.email});
//        if (!user) return ApiResponse.notFoundResponse(res, 'User not found');
        
//        // Set user password for comparison when user is login in
//        if (user && req.url.includes('/login')) {
//            req.hashedpassword = user.password;
//            req.id = new Types.ObjectId(user._id);
//            req.isValidEmail = true;
//            return next();
//        }
//        else return next();
//    } catch (error: any) {
//        res.status(401).json(error);
//    }
//};
