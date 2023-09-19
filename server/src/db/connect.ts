import { connect } from 'mongoose';

export const connectDb = (uri: string) => {
    return connect(uri);
};