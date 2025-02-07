"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crud_1 = require("../api/controllers/crud");
const password_encrypt_1 = require("../middlewares/password-encrypt");
// import { adminAccess } from '../middlewares/access-permissions';
//import { checkUserExists } from '../middlewares/check-user-existence';
const user_model_1 = __importDefault(require("../api/models/user.model"));
const User = user_model_1.default;
module.exports = (router) => {
    // Create a new user
    router.post('/user/new', password_encrypt_1.encryptPassword, (0, crud_1.createOne)(User));
    // Find one user, using an explicit query
    router.get('/user', (0, crud_1.findOne)(User));
    // Find one user, using id
    router.get('/user/:id', (0, crud_1.findById)(User));
    // Find all users
    router.get('/users', (0, crud_1.findAll)(User));
    // Get Document Count 
    //router.get('/user', getDocumentCo unt(User));
    // Update a user
    router.put('/user/:id', (0, crud_1.findAndUpdateOneById)(User));
    // Remove a user
    router.delete('/user/:id', (0, crud_1.deleteOne)(User));
    // Remove a user
    router.delete('/user/:id', (0, crud_1.findAndDeleteOneById)(User));
    // Remove a user
    //router.delete('/users/', deleteAll(User));
};
//# sourceMappingURL=user-routes.js.map