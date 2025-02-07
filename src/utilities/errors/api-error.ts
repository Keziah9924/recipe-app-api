export default class APIError extends Error {
	constructor(
		public name: string,
		public message: string,
		public HTTPStatus: number = 500,
		public isTrusted = true
	) {
		super(message)
	}

	static BadRequest(...args: [name: string, message: string | any] | [error: Error]) {
		if (args.length === 2) {
			const [name, message] = args
			return new APIError(name, message, 400)
		}
		const errorToHandle = args[0]
		return new APIError(errorToHandle.name, errorToHandle.message, 400)
	}

	static Unauthorized(name: string, msg: string) {
		return new APIError(name, msg, 401)
	}

	static Forbidden(name: string, msg: string) {
		return new APIError(name, msg, 403)
	}

	static NotFound(name: string, msg: string) {
		return new APIError(name, msg, 404)
	}

	static MethodNotAllowed(name: string, msg: string) {
		return new APIError(name, msg, 405)
	}
}
