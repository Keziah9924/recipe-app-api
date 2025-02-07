import mongoose from 'mongoose';
import { AppLogger } from '../core/eventLogger';

import 'dotenv/config'

const MONGO_URI = `${process.env.MONGO_URI}`;

export const connectDatabase = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const logger = new AppLogger();
    const scope = 'database.ts';

    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URI, {
        // poolSize: 5, // Maintain up to 10 socket connections - Default = 5
        serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    mongoose.connection.on('connected', () => {
        logger.logInfo(scope, 'Database connection established');
    });

    mongoose.connection.on('disconnected', () => {
        logger.logError(scope, 'Database connection disconnected');
    });

    mongoose.connection.on('error', (err) => {
        console.log(err)
        logger.logError(scope, 'Database connection error ' + err);
    });

    process.on('SIGTERM', () => {
        mongoose.connection.close(true)
        logger.logError(scope, "mongoose disconnected through signal termination!")
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