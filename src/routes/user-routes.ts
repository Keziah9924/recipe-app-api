import { createOne, findOne, findById, findAll, findAndUpdateOneById, findAndDeleteOneById,  deleteOne  } from '../api/controllers/crud'
import { Router } from 'express';
import { encryptPassword } from '../middlewares/password-encrypt';
// import { adminAccess } from '../middlewares/access-permissions';
//import { checkUserExists } from '../middlewares/check-user-existence';
import UserModel from "../api/models/user.model";
import mongoose from "mongoose";

const User = UserModel as mongoose.Model<any>;

export = (router: Router) => {
    // Create a new user
    router.post('/user/new', encryptPassword, createOne(User));

    // Find one user, using an explicit query
    router.get('/user', findOne(User));

   // Find one user, using id
    router.get('/user/:id', findById(User));

    // Find all users
    router.get('/users', findAll(User));
    
    // Get Document Count 
    //router.get('/user', getDocumentCo unt(User));

    // Update a user
    router.put('/user/:id', findAndUpdateOneById(User));

    // Remove a user
     router.delete('/user/:id', deleteOne(User));

    // Remove a user
    router.delete('/user/:id', findAndDeleteOneById(User));

    // Remove a user
    //router.delete('/users/', deleteAll(User));
};
