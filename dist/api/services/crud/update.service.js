"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdateOneResource = exports.findAndUpdateByResourceId = void 0;
const findAndUpdateByResourceId = async (model, query, update, options) => {
    return await model.findByIdAndUpdate(query, update, options);
};
exports.findAndUpdateByResourceId = findAndUpdateByResourceId;
const findAndUpdateOneResource = async (model, query, update, options = { new: true }) => {
    return await model.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateOneResource = findAndUpdateOneResource;
//# sourceMappingURL=update.service.js.map