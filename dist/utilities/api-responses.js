"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "000";
    StatusCode["FAILURE"] = "001";
    StatusCode["RETRY"] = "002";
    StatusCode["INVALID_ACCESS_TOKEN"] = "003";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
const MESSAGES = {
    success: 'Operation Successful',
    conflict: 'Resource Conflict',
    error: 'Internal Server Error',
    not_found: 'Resource Not Found'
};
class ApiResponse {
    successResponse(res, code, msg) {
        return res.status(code || 200).json({ message: msg || MESSAGES["success"] });
    }
    successResponseWithData(res, data, code, msg) {
        const responseData = {
            code: code || 201,
            message: msg || MESSAGES["success"],
            data
        };
        return res.status(code || 200).json(responseData);
    }
    alreadyExistResponse(res, msg) {
        return res.status(409).json({ code: 409, message: msg || MESSAGES["conflict"] });
    }
    errorResponse(res, code, message) {
        return res.status(code || 500).json({ code: code || 500, message: message || MESSAGES["error"] });
    }
    notFoundResponse(res, msg) {
        return res.status(404).json({ code: 404, message: msg || MESSAGES["not_found"] });
    }
    unauthorizedResponse(res) {
        return res.status(401).json({ code: 401, message: 'Unauthorized Access' });
    }
    validationErrorWithData(res, msg, data) {
        const resData = {
            status: StatusCode.INVALID_ACCESS_TOKEN,
            server_message: msg,
            data: data,
        };
        return res.status(ResponseStatus.BAD_REQUEST).json(resData);
    }
    validationErrorOnly(res, msg) {
        const resData = {
            status: StatusCode.FAILURE,
            error: msg,
        };
        return res.status(ResponseStatus.BAD_REQUEST).json(resData);
    }
}
exports.default = new ApiResponse();
//# sourceMappingURL=api-responses.js.map