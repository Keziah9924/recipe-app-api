"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneResource = void 0;
const createOneResource = async (model, input, options) => {
    return await model.create(input, options);
};
exports.createOneResource = createOneResource;
//# sourceMappingURL=create.service.js.map