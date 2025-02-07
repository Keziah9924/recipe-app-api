"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDocuments = exports.findByResourceId = exports.findOneResource = exports.findAllResources = void 0;
const findAllResources = async (model, query, populateOptions) => {
    return await model.find(query).populate(populateOptions);
};
exports.findAllResources = findAllResources;
const findOneResource = async (model, query, options, populateOptions) => {
    const leanOptions = { lean: true, ...(options ?? {}) };
    return await model.findOne(query, {}, leanOptions).populate(populateOptions);
};
exports.findOneResource = findOneResource;
const findByResourceId = async (model, id, options, populateOptions) => {
    const leanOptions = { lean: true, ...(options ?? {}) };
    return await model.findById(id, {}, leanOptions).populate(populateOptions);
};
exports.findByResourceId = findByResourceId;
const countDocuments = async (model, query) => {
    return await model.find(query).count();
};
exports.countDocuments = countDocuments;
//# sourceMappingURL=find.service.js.map