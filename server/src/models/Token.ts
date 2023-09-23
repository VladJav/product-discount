import {model, Schema} from "mongoose";

interface IToken{
    token: string,
    user: Schema.Types.ObjectId,
    userAgent: string,
}

const tokenSchema = new Schema<IToken>({
    token:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userAgent:{
        type: String,
        required: true,
    },
});

export const Token = model<IToken>('Token', tokenSchema);
