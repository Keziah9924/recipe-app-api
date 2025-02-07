"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllResources = exports.deleteOneResource = exports.findAndDeleteOneByResourceId = void 0;
const findAndDeleteOneByResourceId = async (model, id, options) => {
    return await model.findByIdAndDelete(id, options);
};
exports.findAndDeleteOneByResourceId = findAndDeleteOneByResourceId;
const deleteOneResource = async (model, query, options) => {
    return await model.deleteOne(query, options);
};
exports.deleteOneResource = deleteOneResource;
const deleteAllResources = async (model, query, options) => {
    return await model.deleteMany(query, options);
};
exports.deleteAllResources = deleteAllResources;
//# sourceMappingURL=delete.service.js.map