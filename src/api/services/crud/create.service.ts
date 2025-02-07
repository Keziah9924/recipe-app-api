import { Model, SaveOptions } from 'mongoose'

export const createOneResource = async <T>(model: Model<T>, input: Record<string, any>, options?: SaveOptions) => {
    return await model.create(input, options)
}
