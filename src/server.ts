import http from 'http';
import { AppLogger } from './core/eventLogger';
import app from './app';
import { connectDatabase } from './config/database';
import {seedUsers} from './utilities/seeder'

const appLogger = new AppLogger();
const scope = 'server.ts';
const port = process.env.PORT || 3000;
const server = http.createServer({}, app);


server
    .listen(port, async () => {
        await connectDatabase();
        await seedUsers()
        appLogger.logInfo(scope, `Server started on port ${port}`);
    })
    .on('error', (e) => {
        appLogger.logError(scope, e.toString());
    });
