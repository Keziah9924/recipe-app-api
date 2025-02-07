import { FilterQuery, Model, QueryOptions, ObjectId } from 'mongoose';

export const findAndDeleteOneByResourceId = async <T>(model: Model<T>, id: ObjectId | string, options?: QueryOptions) => {
    return await model.findByIdAndDelete(id, options);
}

export const deleteOneResource = async <T>(model: Model<T>, query?: FilterQuery<T>, options?: QueryOptions<T>) => {
    return await model.deleteOne(query, options);
}

export const deleteAllResources = async <T>(model: Model<T>, query: FilterQuery<T>, options?: QueryOptions<T>) => {
    return await model.deleteMany(query, options);
}
