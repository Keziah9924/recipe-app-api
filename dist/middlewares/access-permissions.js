"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = extractJWTfromAuthHeader(req);
//         const tokenData = verifyToken(token) as jwtResponse
//
//         const checkUser:any = await findById(UserModel, tokenData.id) as any;
//
//         if (!checkUser) return next({ code: 401, msg: 'Unauthorised. Permission denied' });
//
//         return ['admin'].includes(checkUser.role) ? next() : ApiResponse.unauthorizedResponse(res);
//     } catch (error) {
//         if (error instanceof JsonWebTokenError) {
//             return ApiResponse.errorResponse(res, 400, error.message);
//         }
//
//         return next(error)
//     }
//
// };
//const generalAccess = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//        if (!req.headers['authorization']) return ApiResponse.errorResponse(res, 'Unauthorized Request Headers', 'Provide request authorization')
//        const userId = getUserIdFromToken(req.headers['authorization']);
//        if (typeof (userId) !== 'string') return ApiResponse.errorResponse(res, 'Token expired', 'Token expired')
//        const currentUser: User | null = await findUser({ _id: userId });
//        if (!currentUser) return next({ code: 401, msg: 'Unauthorised. Permission denied' });
//        return ['admin', 'user'].includes(currentUser.role) ? next() : next({ code: 401, msg: 'Unauthorised. Permission denied' });
//    } catch (error: any) {
//        const error_message = error.message
//        const match = error_message.match(/msg: '(.+?)'/)
//        match ? match[1] : null;
//        return res.status(401).json({ message: match })
//    }
//};
// export { adminAccess };
//# sourceMappingURL=access-permissions.js.map