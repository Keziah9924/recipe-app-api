import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../../types';

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;