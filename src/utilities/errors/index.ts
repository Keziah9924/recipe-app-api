import * as Http from 'http'
import util from 'util'
import APIError from './api-error'

let httpServerRef: Http.Server

const errorHandler = {
    listenToErrorEvents: (httpServer: Http.Server) => {
        httpServerRef = httpServer
        process.on('uncaughtException', async error => {
            await errorHandler.handleError(error)
        })

        process.on('unhandledRejection', async reason => {
            await errorHandler.handleError(reason)
        })

        process.on('SIGTERM', async () => {
            console.error(
                'API received SIGTERM event, try to gracefully close the server'
            )
            await terminateHttpServerAndExit()
        })

        process.on('SIGINT', async () => {
            console.error(
                'API received SIGINT event, try to gracefully close the server'
            )
            await terminateHttpServerAndExit()
        })
    },

    handleError: (errorToHandle: unknown) => {
        try {
            const appError: APIError = normalizeError(errorToHandle)
            console.error(appError.name, ':', appError.message)

            if (!appError.isTrusted) {
                terminateHttpServerAndExit()
            }
        } catch (handlingError: unknown) {
            process.stdout.write(
                'The error handler failed, here are the handler failure and then the origin error that it tried to handle'
            )
            process.stdout.write(JSON.stringify(handlingError))
            process.stdout.write(JSON.stringify(errorToHandle))
        }
    },
}

const terminateHttpServerAndExit = async () => {
    if (httpServerRef) {
        await httpServerRef.close()
    }
    process.exit()
}

const normalizeError = (errorToHandle: unknown): APIError => {
    if (errorToHandle instanceof APIError) {
        return errorToHandle
    }
    if (errorToHandle instanceof Error) {
        const appError = new APIError(errorToHandle.name, errorToHandle.message)
        appError.stack = errorToHandle.stack
        return appError
    }

    const inputType = typeof errorToHandle
    return new APIError(
        'general-error',
        `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
            errorToHandle
        )}`
    )
}

export { errorHandler, APIError }
