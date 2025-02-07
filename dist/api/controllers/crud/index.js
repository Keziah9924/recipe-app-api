"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.findAndDeleteOneById = exports.deleteOne = exports.findAndUpdateOneById = exports.getDocumentCount = exports.findAll = exports.findById = exports.findOne = exports.createOne = void 0;
const create_controller_1 = require("./create.controller");
Object.defineProperty(exports, "createOne", { enumerable: true, get: function () { return create_controller_1.createOne; } });
const read_controller_1 = require("./read.controller");
Object.defineProperty(exports, "findOne", { enumerable: true, get: function () { return read_controller_1.findOne; } });
Object.defineProperty(exports, "findById", { enumerable: true, get: function () { return read_controller_1.findById; } });
Object.defineProperty(exports, "findAll", { enumerable: true, get: function () { return read_controller_1.findAll; } });
Object.defineProperty(exports, "getDocumentCount", { enumerable: true, get: function () { return read_controller_1.getDocumentCount; } });
const update_controller_1 = require("./update.controller");
Object.defineProperty(exports, "findAndUpdateOneById", { enumerable: true, get: function () { return update_controller_1.findAndUpdateOneById; } });
const delete_controller_1 = require("./delete.controller");
Object.defineProperty(exports, "deleteOne", { enumerable: true, get: function () { return delete_controller_1.deleteOne; } });
Object.defineProperty(exports, "findAndDeleteOneById", { enumerable: true, get: function () { return delete_controller_1.findAndDeleteOneById; } });
Object.defineProperty(exports, "deleteAll", { enumerable: true, get: function () { return delete_controller_1.deleteAll; } });
//# sourceMappingURL=index.js.map