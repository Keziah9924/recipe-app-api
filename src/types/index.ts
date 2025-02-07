import { Types } from 'mongoose';

//Interfaces
export interface IUser {
    _id?: Types.ObjectId;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}