"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseErrorHandler = void 0;
class MongooseErrorHandler {
    static handle(error) {
        let mongooseResponse;
        switch (error.name) {
            case 'ValidationError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'CastError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'MongoServerError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'VersionError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'MissingSchemaError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'DivergentArrayError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'OverwriteModelError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'ParallelSaveError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'StrictModeError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            default:
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
        }
        return mongooseResponse;
    }
}
exports.MongooseErrorHandler = MongooseErrorHandler;
//# sourceMappingURL=mongoose-error.js.map