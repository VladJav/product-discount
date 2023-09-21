import {model, Schema} from "mongoose";
import validator from "validator";

interface IUser{
    email: string,
    activationCode?: string,
    isActivated: boolean,
    role: string
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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
});

export default model('User', userSchema);