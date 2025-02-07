"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const eventLogger_1 = require("./core/eventLogger");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const seeder_1 = require("./utilities/seeder");
const appLogger = new eventLogger_1.AppLogger();
const scope = 'server.ts';
const port = process.env.PORT || 3000;
const server = http_1.default.createServer({}, app_1.default);
server
    .listen(port, async () => {
    await (0, database_1.connectDatabase)();
    await (0, seeder_1.seedUsers)();
    appLogger.logInfo(scope, `Server started on port ${port}`);
})
    .on('error', (e) => {
    appLogger.logError(scope, e.toString());
});
//# sourceMappingURL=server.js.map