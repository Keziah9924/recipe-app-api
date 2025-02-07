import { Request, Response } from 'express';
import logger from '../core/logger';
import { errorHandler} from '../utilities/errors'

export const ErrorHandler = (error: any, _req: Request, res: Response) => {
        console.assert(error instanceof Error)

        if (error && typeof error === 'object') {
            if (error.isTrusted === undefined || error.isTrusted === null) error.isTrusted = true

            errorHandler.handleError(error)
            logger.error(error.message)
            return res.status(error?.HTTPStatus || 500).json({
                status: 'failed',
                error: {
                    ...error,
                    message: error.message,
                },
            })
        }
};


export const InvalidUrl = (req: Request, res: Response) => {
    return res.status(404).json({ message: `URL ${req.url} does not exist.` });
}