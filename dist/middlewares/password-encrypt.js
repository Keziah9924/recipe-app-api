"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = async (req, res, next) => {
    if (!req.body.password)
        return res.status(400).json({ message: 'No password provided' });
    try {
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.encryptPassword = encryptPassword;
//# sourceMappingURL=password-encrypt.js.map