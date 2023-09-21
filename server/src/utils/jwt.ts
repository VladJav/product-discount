import {UnauthenticatedError} from "../erors";
import jwt from "jsonwebtoken";

interface JwtPayload {
    email: string
}

export const validateAccessToken = (accessToken: string) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_SECRET || '') as JwtPayload;
    }
    catch (e) {
        throw new UnauthenticatedError('Bad Token');
    }
};