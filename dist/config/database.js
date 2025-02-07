"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventLogger_1 = require("../core/eventLogger");
require("dotenv/config");
const MONGO_URI = `${process.env.MONGO_URI}`;
const connectDatabase = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const logger = new eventLogger_1.AppLogger();
    const scope = 'database.ts';
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(MONGO_URI, {
        // poolSize: 5, // Maintain up to 10 socket connections - Default = 5
        serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    mongoose_1.default.connection.on('connected', () => {
        logger.logInfo(scope, 'Database connection established');
    });
    mongoose_1.default.connection.on('disconnected', () => {
        logger.logError(scope, 'Database connection disconnected');
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.log(err);
        logger.logError(scope, 'Database connection error ' + err);
    });
    process.on('SIGTERM', () => {
        mongoose_1.default.connection.close(true);
        logger.logError(scope, "mongoose disconnected through signal termination!");
        process.exit(0);
    });
    // process.on('SIGINT', () => {
    //     mongoose.connection.close(true)
    //     logger.logError(scope, 'Database disconnected through signal interruption!');
    //     return process.exit(0);
    // });
    //
    // process.once('SIGUSR2', () => {
    //     mongoose.connection.close(true)
    //     logger.logError(scope, "mongoose disconnected through app termination!")
    //     process.kill(process.pid, 'SIGUSR2');
    // });
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database.js.map