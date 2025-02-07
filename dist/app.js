"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const Cloudinary = __importStar(require("cloudinary"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//import passport from 'passport'
//import PassportOAuth from "./api/controllers/auth/passport";
const route_exception_1 = require("./middlewares/route-exception");
const routes_1 = require("./routes");
dotenv_1.default.config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const app = (0, express_1.default)();
const cloudinary = Cloudinary.v2;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_1.urlencoded)({ limit: '10mb', extended: false, parameterLimit: 10000 }));
app.use((0, express_1.json)({ limit: '10mb' }));
app.use((0, cors_1.default)({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use((0, helmet_1.default)());
app.use((0, hpp_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'SESSION_SECRET',
    resave: false, // Set to false to avoid session re-saving on every request
    saveUninitialized: true, // Set to true to save sessions that are new but not modified
    cookie: {
        secure: true, // Set to true if using HTTPS, false for development (HTTP)
        maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (e.g., 1 day)
    },
}));
//app.use(passport.initialize());
//app.use(passport.session())
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});
//PassportOAuth()
app.use('/api/v1', routes_1.router);
const healthCheck = (_req, res) => {
    try {
        return res.status(200).json({
            isHealthy: true,
            greeting: 'Hi there, I am YDM-API',
            health: 'It seems I am healthy ✨',
            message: 'You are welcome 😁',
        });
    }
    catch (error) {
        if (error)
            return res.status(503).json({
                isHealthy: false,
                message: 'I\'m offline 😥, ',
            });
    }
};
// Home route response and health status check
app.get('/', healthCheck);
app.get('/health', healthCheck);
app.get('/api/v1/health', healthCheck);
// Catch 404 and non-existing endpoint urls
app.use(route_exception_1.InvalidUrl);
// handle route errors
app.use(route_exception_1.ErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map