//import crypto from 'crypto'
//import { Request, Response, NextFunction } from 'express'
//import { Model, QueryOptions, SaveOptions } from 'mongoose'
//import { APIError } from '../errors'
//import { createAccessToken, createRefreshToken, signToken } from '../jwt'
//import * as ServiceFactory from '../service-factory'

//const { BE_URL, FE_URL, HASH_ALGORITHM } = process.env


//export function getAll<T>(model: Model<T>) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		const modelName = model.modelName.toLowerCase()
//		try {
//			const page: any = req.query.page || 0
//			const docsPerPage = 20
//			const docs = await model
//				.find()
//				.skip(page * docsPerPage)
//				.limit(docsPerPage)
//			res
//				.status(200)
//				.json({ status: 'success', data: { [getPlural(modelName)]: docs } })
//		} catch (error) {
//			return next(APIError.BadRequest(error))
//		}
//	}
//}

//export function getAllIDs<T>(model: Model<T>) {
//	return async function () {
//		const docs = await model.find()
//		const docIds = docs.map(doc => doc._id.toString())
//		return docIds
//	}
//}

//export function getOne<T>(model: Model<T>) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		const modelName = model.modelName.toLowerCase()
//		try {
//			const { id } = req.params
//			const doc = await ServiceFactory.findById(model, id)
//			if (!doc) {
//				return next(
//					APIError.NotFound(
//						`${modelName}-not-found`,
//						`${modelName} with ${id} does not exist`
//					)
//				)
//			}
//			res.status(200).json({ status: 'success', data: { [modelName]: doc } })
//		} catch (error) {
//			return next(APIError.BadRequest(error))
//		}
//	}
//}

//export function updateOne<T>(model: Model<T>) {
//	return async function (req: Request, res: Response, next: NextFunction) {
//		const modelName = model.modelName.toLowerCase()
//		try {
//			const { id } = req.params
//			const doc = await ServiceFactory.findAndUpdateOne(
//				model,
//				{ _id: id },
//				req.body,
//				{ new: true, runValidators: true }
//			)

//			if (!doc) {
//				return next(
//					APIError.BadRequest(
//						`${modelName}-not-found`,
//						`${modelName} with ${id} does not exist`
//					)
//				)
//			}
//			res.status(200).json({ status: 'success', data: { [modelName]: doc } })
//		} catch (error) {
//			next(error)
//		}
//	}
//}

//export function deleteOne<T>(model: Model<T>) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		const modelName = model.modelName.toLowerCase()
//		try {
//			const { id } = req.params
//			const doc = await ServiceFactory.findAndDeleteOneById(model, id)

//			if (!doc) {
//				return next(
//					APIError.NotFound(
//						`${modelName}-not-found`,
//						`${modelName} with ${id} does not exist`
//					)
//				)
//			}
//			res.status(204).json({
//				status: 'success',
//				data: null,
//			})
//		} catch (error) {
//			return next(APIError.BadRequest(error))
//		}
//	}
//}

//export function deleteAll<T>(model: Model<T>) {
//	return async (_: Request, res: Response, next: NextFunction) => {
//		try {
//			await ServiceFactory.deleteAll(model)
//			res.status(204).json({ status: 'success', data: null })
//		} catch (error) {
//			return next(APIError.BadRequest(error))
//		}
//	}
//}

//export function getMe<T>(model: Model<T>, options?: QueryOptions) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		try {
//			const id = req.user?.id

//			const user = await ServiceFactory.findById(model, id, options).select(
//				'-__v -role'
//			)

//			if (!user) {
//				return next(
//					APIError.Forbidden(
//						'forbidden',
//						'You are not authorized to access this resource.'
//					)
//				)
//			}

//			res.status(200).json({
//				status: 'success',
//				data: { [model.modelName.toLowerCase()]: user },
//			})
//		} catch (error) {
//			next(error)
//		}
//	}
//}

//function filterObject(obj: Record<string, any>, ...allowedFields: string[]) {
//	let filteredObj: Record<string, any> = {}
//	Object.keys(obj).forEach(key => {
//		if (allowedFields.includes(key)) {
//			filteredObj[key] = obj[key]
//		}
//	})
//	return filteredObj
//}

//export function updateMe<T extends UserDoc>(
//	model: Model<T>,
//	fieldsAllowed: string[]
//) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		try {
//			const id = req.user?.id

//			if ('password' in req.body) {
//				return next(
//					APIError.Forbidden(
//						'forbidden',
//						'This operation is not allowed for password updates'
//					)
//				)
//			}

//			const user = await model.findByIdAndUpdate(
//				id,
//				filterObject(req.body, ...fieldsAllowed),
//				{
//					new: true,
//					runValidators: true,
//				}
//			)

//			if (!user) {
//				return next(
//					APIError.Forbidden(
//						'Forbidden',
//						'You are not authorized to access this resource.'
//					)
//				)
//			}

//			if (user.role === 'user') {
//				const token = signToken({ user }, undefined, {
//					expiresIn: process.env.JWT_EXPIRES_IN,
//				})
//				res.status(200).json({ status: 'success', token })
//				return
//			}

//			res.status(200).json({ status: 'success', data: { user } })
//		} catch (error) {
//			next(error)
//		}
//	}
//}

//export function getChangePasswordHandler<T extends UserDoc>(model: Model<T>) {
//	return async function (req: Request, res: Response, next: NextFunction) {
//		try {
//			const oldPassword = req.body.oldPassword
//			const newPassword = req.body.newPassword
//			const repeatNewPassword = req.body.repeatPassword

//			if (!oldPassword || !newPassword || !repeatNewPassword) {
//				return next(
//					APIError.BadRequest(
//						'required-fields-missing',
//						'Some required fields are missing.'
//					)
//				)
//			}

//			if (newPassword !== repeatNewPassword) {
//				return next(
//					APIError.BadRequest(
//						'invaid-input',
//						'The two passwords entered are not a match.'
//					)
//				)
//			}
//			const user = await model.findById(req.user?.id).select('+password')

//			if (!user || !(await user?.checkPassword(oldPassword, user.password!))) {
//				return next(
//					APIError.BadRequest(
//						'invalid-id-or-password',
//						'The id or password provided is invalid.'
//					)
//				)
//			}

//			user.password = newPassword
//			await user.save()

//			user.password = undefined
//			res.status(200).json({
//				status: 'success',
//				message: 'Password successfully changed',
//				data: { user },
//			})
//		} catch (error) {
//			return next(error)
//		}
//	}
//}

//export function getForgotPasswordHandler<T extends UserDoc>(model: Model<T>) {
//	return async function (req: Request, res: Response, next: NextFunction) {
//		try {
//			const modelName = model.modelName.toLowerCase()
//			const user = await model.findOne({ email: req.body.email })

//			if (!user) {
//				return next(
//					APIError.NotFound(
//						`no-${modelName}-found`,
//						`No ${modelName} with the email provided exits in our records.`
//					)
//				)
//			}

//			const resetToken = user.createPasswordResetToken()
//			await user.save({ validateBeforeSave: false })

//			const desktopResetLink = `${FE_URL}/reset-password/${resetToken}`
//			const mobileResetLink = `${BE_URL}/password/reset?token=${resetToken}`

//			const resetLink = modelName == 'user' ? mobileResetLink : desktopResetLink

//			const template = await compileMailTemplate(
//				'/../../views/forgot_password.ejs',
//				{ name: user.name, resetLink }
//			)

//			const mail = prepareMailOptionsForMail(
//				'Password Reset Request',
//				user.email,
//				template
//			)

//			try {
//				await sendMail(mail)

//				res.status(200).json({
//					status: 'success',
//					message: 'An email was sent to the email provided.',
//				})
//			} catch (error) {
//				user.passwordResetToken = undefined
//				user.passwordResetExpires = undefined
//				await user.save({ validateBeforeSave: false })

//				return next(
//					new APIError(
//						'mail-not-sent',
//						'There was a problem sending the email. Try at another time.'
//					)
//				)
//			}
//		} catch (error) {
//			next(error)
//		}
//	}
//}

//export function getResetPasswordHandler<T extends UserDoc>(model: Model<T>) {
//	return async function (req: Request, res: Response, next: NextFunction) {
//		try {
//			const hashedToken = crypto
//				.createHash(HASH_ALGORITHM!)
//				.update(req.params.token)
//				.digest('hex')

//			const user = await model.findOne({
//				passwordResetToken: hashedToken,
//				passwordResetExpires: { $gt: Date.now() },
//			})

//			if (!user) {
//				return next(
//					APIError.BadRequest(
//						'invalid-or-expired-reset-token',
//						'The reset token provided is invalid or expired'
//					)
//				)
//			}

//			user.password = req.body.password
//			user.passwordResetToken = undefined
//			user.passwordResetExpires = undefined
//			await user.save()

//			user.password = undefined

//			const response: Record<string, string> = {}
//			if (user.role === 'user') {
//				response.token = signToken({ user: user.toJSON() }, undefined, {
//					expiresIn: process.env.JWT_EXPIRES_IN,
//				})

//				return res.status(200).json({
//					status: 'success',
//					message: 'Password reset successful',
//					...response,
//				})
//			}

//			const accessToken = createAccessToken({ user: user.toJSON() })
//			const refreshToken = createRefreshToken({
//				id: user._id,
//				role: user.role,
//			})

//			response.accessToken = accessToken
//			response.refreshToken = refreshToken

//			res.status(200).json({
//				status: 'success',
//				message: 'Password reset successful',
//				...response,
//			})
//		} catch (error) {
//			next(error)
//		}
//	}
//}

//export function updateUserHandele<T>(model: Model<T>, fieldsAllowed: string[]) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		try {
//			const id = req.user?.id

//			if ('password' in req.body) {
//				return next(
//					APIError.Forbidden(
//						'forbidden',
//						'This operation is not allowed for password updates'
//					)
//				)
//			}

//			const user = await model.findByIdAndUpdate(
//				id,
//				filterObject(req.body, ...fieldsAllowed),
//				{
//					new: true,
//					runValidators: true,
//				}
//			)

//			if (!user) {
//				return next(
//					APIError.Forbidden(
//						'Forbidden',
//						'You are not authorized to access this resource.'
//					)
//				)
//			}

//			const token = signToken({ user: req.user }, undefined, {
//				expiresIn: process.env.JWT_EXPIRES_IN,
//			})
//			res.status(200).json({
//				status: 'success',
//				message: 'Profile updated successfully',
//				token,
//			})
//		} catch (error) {
//			next(error)
//		}
//	}
//}

//// delete organizer plus ogranizer event
//export function deleteOrganizer<T>(model: Model<T>) {
//	return async (req: Request, res: Response, next: NextFunction) => {
//		const modelName = model.modelName.toLowerCase()
//		try {
//			const { id } = req.params

//			const doc =
//				(await model.findByIdAndDelete(id)) &&
//				(await Event.deleteMany({ organizer: { $in: id } }))

//			if (!doc) {
//				return next(
//					APIError.BadRequest(
//						`${modelName}-not-found`,
//						`${modelName} with ${id} does not exist`
//					)
//				)
//			}

//			res.status(204).json({
//				status: 'success',
//				data: null,
//			})
//		} catch (error) {
//			return next(APIError.BadRequest(error))
//		}
//	}
//}
