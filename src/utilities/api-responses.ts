import { Response } from 'express';
export enum StatusCode {
    SUCCESS = '000',
    FAILURE = '001',
    RETRY = '002',
    INVALID_ACCESS_TOKEN = '003',
}

enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_ERROR = 500,
}

const MESSAGES = {
    success: 'Operation Successful',
    conflict: 'Resource Conflict',
    error: 'Internal Server Error',
    not_found: 'Resource Not Found'
}

class ApiResponse {
    successResponse(res: Response, code?: number, msg?: string) {
        return res.status(code || 200).json({ message: msg || MESSAGES["success"] });
    }

    successResponseWithData(res: Response, data: object | any, code?: number, msg?: string) {
        const responseData = {
            code: code || 201,
            message: msg || MESSAGES["success"],
            data
        };
        return res.status(code || 200).json(responseData);
    }

    alreadyExistResponse(res: Response, msg?: string) {
        return res.status(409).json({ code: 409, message: msg || MESSAGES["conflict"] });
    }

    errorResponse(res: Response, code: number, message: string) {
        return res.status(code || 500).json({ code: code || 500, message: message || MESSAGES["error"] });
    }

    notFoundResponse(res: Response, msg: string) {
        return res.status(404).json({ code: 404, message: msg || MESSAGES["not_found"] });
    }

    unauthorizedResponse(res: Response) {
        return res.status(401).json({ code: 401, message: 'Unauthorized Access' });
    }


    validationErrorWithData(res: Response, msg: string, data: object) {
        const resData = {
            status: StatusCode.INVALID_ACCESS_TOKEN,
            server_message: msg,
            data: data,
        };
        return res.status(ResponseStatus.BAD_REQUEST).json(resData);
    }

    validationErrorOnly(res: Response, msg: string) {
        const resData = {
            status: StatusCode.FAILURE,
            error: msg,
        };
        return res.status(ResponseStatus.BAD_REQUEST).json(resData);
    }
}

export default new ApiResponse();
