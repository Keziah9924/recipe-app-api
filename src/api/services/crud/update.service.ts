import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose'

export const findAndUpdateByResourceId = async <T>(model: Model<T>, query: FilterQuery<T> , update: UpdateQuery<T>, options: QueryOptions<T>) => {
    return await model.findByIdAndUpdate(query, update, options);
}

export const findAndUpdateOneResource = async <T>(model: Model<T>, query: FilterQuery<T> , update: UpdateQuery<T>, options: QueryOptions<T> = {new: true}) => {
    return await model.findOneAndUpdate(query, update, options);
}