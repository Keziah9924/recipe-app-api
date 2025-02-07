"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJWTfromAuthHeader = exports.createAccessToken = exports.createRefreshToken = exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, } = process.env;
const signToken = (payload, secret = JWT_SECRET, options) => {
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.signToken = signToken;
const verifyToken = (token, secret = JWT_SECRET) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
const createRefreshToken = (payload) => {
    return (0, exports.signToken)(payload, REFRESH_TOKEN_SECRET, {
    //expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
};
exports.createRefreshToken = createRefreshToken;
const createAccessToken = (payload) => {
    return (0, exports.signToken)(payload, JWT_SECRET, {
    //expiresIn: JWT_EXPIRES_IN,
    });
};
exports.createAccessToken = createAccessToken;
const extractJWTfromAuthHeader = (req) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    return token;
};
exports.extractJWTfromAuthHeader = extractJWTfromAuthHeader;
//# sourceMappingURL=index.js.map