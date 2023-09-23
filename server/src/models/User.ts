import {model, Schema} from "mongoose";
import validator from "validator";

interface IUser{
    email: string,
    activationCode?: string,
    loginCode?: string,
    isActivated?: boolean,
    role?: string
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: [validator.isEmail, 'Please fill a valid email address'],
        unique: true
    },
    activationCode: {
        type: String,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    loginCode: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
});

export const User = model<IUser>('User', userSchema);