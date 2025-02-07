import mongoose from 'mongoose';

class MongooseErrorHandler {
    static handle(error: mongoose.Error | any) {
        let mongooseResponse
        switch (error.name) {
            case 'ValidationError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'CastError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message };
                break;
            case 'MongoServerError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            case 'VersionError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            case 'MissingSchemaError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            case 'DivergentArrayError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            case 'OverwriteModelError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            case 'ParallelSaveError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            case 'StrictModeError':
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
            default:
                mongooseResponse = { code: error.code || 400, name: `Mongoose ${error.name}`, message: error.message }
                break;
        }
        return mongooseResponse;
    }
}

export { MongooseErrorHandler };
