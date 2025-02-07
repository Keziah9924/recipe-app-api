"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.errorHandler = void 0;
const util_1 = __importDefault(require("util"));
const api_error_1 = __importDefault(require("./api-error"));
exports.APIError = api_error_1.default;
let httpServerRef;
const errorHandler = {
    listenToErrorEvents: (httpServer) => {
        httpServerRef = httpServer;
        process.on('uncaughtException', async (error) => {
            await errorHandler.handleError(error);
        });
        process.on('unhandledRejection', async (reason) => {
            await errorHandler.handleError(reason);
        });
        process.on('SIGTERM', async () => {
            console.error('API received SIGTERM event, try to gracefully close the server');
            await terminateHttpServerAndExit();
        });
        process.on('SIGINT', async () => {
            console.error('API received SIGINT event, try to gracefully close the server');
            await terminateHttpServerAndExit();
        });
    },
    handleError: (errorToHandle) => {
        try {
            const appError = normalizeError(errorToHandle);
            console.error(appError.name, ':', appError.message);
            if (!appError.isTrusted) {
                terminateHttpServerAndExit();
            }
        }
        catch (handlingError) {
            process.stdout.write('The error handler failed, here are the handler failure and then the origin error that it tried to handle');
            process.stdout.write(JSON.stringify(handlingError));
            process.stdout.write(JSON.stringify(errorToHandle));
        }
    },
};
exports.errorHandler = errorHandler;
const terminateHttpServerAndExit = async () => {
    if (httpServerRef) {
        await httpServerRef.close();
    }
    process.exit();
};
const normalizeError = (errorToHandle) => {
    if (errorToHandle instanceof api_error_1.default) {
        return errorToHandle;
    }
    if (errorToHandle instanceof Error) {
        const appError = new api_error_1.default(errorToHandle.name, errorToHandle.message);
        appError.stack = errorToHandle.stack;
        return appError;
    }
    const inputType = typeof errorToHandle;
    return new api_error_1.default('general-error', `Error Handler received a none error instance with type - ${inputType}, value - ${util_1.default.inspect(errorToHandle)}`);
};
//# sourceMappingURL=index.js.map