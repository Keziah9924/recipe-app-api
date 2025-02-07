"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDocuments = exports.findAndDeleteOneByResourceId = exports.deleteAllResources = exports.deleteOneResource = exports.findAndUpdateOneResource = exports.findAndUpdateByResourceId = exports.findByResourceId = exports.findAllResources = exports.findOneResource = exports.createOneResource = void 0;
const create_service_1 = require("./crud/create.service");
Object.defineProperty(exports, "createOneResource", { enumerable: true, get: function () { return create_service_1.createOneResource; } });
const find_service_1 = require("./crud/find.service");
Object.defineProperty(exports, "findOneResource", { enumerable: true, get: function () { return find_service_1.findOneResource; } });
Object.defineProperty(exports, "findAllResources", { enumerable: true, get: function () { return find_service_1.findAllResources; } });
Object.defineProperty(exports, "findByResourceId", { enumerable: true, get: function () { return find_service_1.findByResourceId; } });
Object.defineProperty(exports, "countDocuments", { enumerable: true, get: function () { return find_service_1.countDocuments; } });
const update_service_1 = require("./crud/update.service");
Object.defineProperty(exports, "findAndUpdateByResourceId", { enumerable: true, get: function () { return update_service_1.findAndUpdateByResourceId; } });
Object.defineProperty(exports, "findAndUpdateOneResource", { enumerable: true, get: function () { return update_service_1.findAndUpdateOneResource; } });
const delete_service_1 = require("./crud/delete.service");
Object.defineProperty(exports, "deleteOneResource", { enumerable: true, get: function () { return delete_service_1.deleteOneResource; } });
Object.defineProperty(exports, "deleteAllResources", { enumerable: true, get: function () { return delete_service_1.deleteAllResources; } });
Object.defineProperty(exports, "findAndDeleteOneByResourceId", { enumerable: true, get: function () { return delete_service_1.findAndDeleteOneByResourceId; } });
//# sourceMappingURL=index.js.map