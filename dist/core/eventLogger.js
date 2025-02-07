"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const logger_1 = __importDefault(require("./logger"));
class AppLogger {
    constructor() {
        this.logError = (scope, message) => {
            logger_1.default.error(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
        };
        this.logWarn = (scope, message) => {
            logger_1.default.warn(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
        };
        this.logInfo = (scope, message) => {
            logger_1.default.info(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
        };
        this.logDebug = (scope, message) => {
            logger_1.default.debug(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
        };
    }
}
exports.AppLogger = AppLogger;
function getLocationOfLogCaller() {
    let callLocation = new Error('').stack.split('at ')[3].trim();
    const pathParts = callLocation.split('/');
    callLocation = pathParts[pathParts.length - 1];
    return callLocation;
}
//# sourceMappingURL=eventLogger.js.map