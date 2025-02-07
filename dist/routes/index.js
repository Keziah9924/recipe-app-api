"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user-routes"));
const authentication_routes_1 = __importDefault(require("./authentication-routes"));
const router = (0, express_1.Router)();
exports.router = router;
(0, authentication_routes_1.default)(router);
(0, user_routes_1.default)(router);
//# sourceMappingURL=index.js.map