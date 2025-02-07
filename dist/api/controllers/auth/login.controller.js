"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const api_responses_1 = __importDefault(require("../../../utilities/api-responses"));
const services_1 = require("../../services");
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../../utilities/jwt");
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!password)
            return api_responses_1.default.errorResponse(res, 401, 'Email and password required');
        const user = await (0, services_1.findOneResource)(user_model_1.default, { email: email });
        if (!user)
            return api_responses_1.default.notFoundResponse(res, `${user_model_1.default.modelName.toLowerCase()} not found`);
        const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
        const { password: _, __v, ...tokenData } = user;
        const accessToken = (0, jwt_1.createAccessToken)({ ...tokenData });
        return isPasswordMatch ? res.status(200).json({ code: 200, message: 'Login successful!', token: accessToken }) :
            api_responses_1.default.errorResponse(res, 400, 'Email or password incorrect');
    }
    catch (error) {
        return next(error);
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=login.controller.js.map