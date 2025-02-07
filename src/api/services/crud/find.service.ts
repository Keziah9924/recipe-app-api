import { FilterQuery, Model, QueryOptions } from 'mongoose'

export const findAllResources = async <T>(model: Model<T>, query: FilterQuery<T>, populateOptions?: any) => {
    return await model.find(query).populate(populateOptions);
}

export const findOneResource = async <T>(model: Model<T>, query: any, options?: Partial<QueryOptions<T>>, populateOptions?:any) => {
    const leanOptions: QueryOptions<T> = { lean: true, ...(options ?? {}) };
    return await model.findOne(query, {}, leanOptions).populate(populateOptions);
}

export const findByResourceId = async <T>(model: Model<T>, id: string, options?: Partial<QueryOptions<T>>, populateOptions?: any) => {
    const leanOptions: QueryOptions<T> = { lean: true, ...(options ?? {}) };
    return await model.findById(id, {}, leanOptions).populate(populateOptions);
}

export const countDocuments = async <T>(model: Model<T>, query: FilterQuery<T>) => {
    return await model.find(query).count();
}