import jwt from "jsonwebtoken";
import {Token} from "../models/Token";
import {UnauthenticatedError} from "../erors";
import {Response} from "express";
import {Error} from "mongoose";

interface JWTPayload {
    user: string;
    role: string;
}

export class JWT {
    private _payload: JWTPayload;
    private _token: string;

    get payload(): JWTPayload {
        return this._payload;
    }

    set payload(value: JWTPayload) {
        this._payload = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    constructor(secretKey: string, arg: string | JWTPayload, expiresIn: string) {
        const instanceOfJWTPayload = (object: string | JWTPayload): object is JWTPayload => {
            return (object as JWTPayload).role !== undefined;
        };
        if(typeof arg === 'string'){
            this._payload = jwt.verify(arg, secretKey) as JWTPayload;
            this._token = arg;
        }
        else if(instanceOfJWTPayload(arg)){
            this._token = jwt.sign(arg, secretKey, { expiresIn });
            this._payload = arg;
        }
        else{
            throw new Error('Bad argument');
        }
    }
}

export class AccessToken extends JWT{

    constructor(arg: string | JWTPayload) {
        super(process.env.JWT_ACCESS_SECRET, arg, '10m');
    }

}

export class RefreshToken extends JWT{

    constructor(arg: string | JWTPayload) {
        super(process.env.JWT_REFRESH_SECRET, arg, '30d');
    }

}

class JWTService {
    async saveToken(userId: string, refreshToken: string, userAgent: string){
        const token = await Token.findOne({ user: userId });
        if (token) {
            token.token = refreshToken;
            token.userAgent = userAgent;
            return token.save();
        }
        return Token.create({ user: userId, token: refreshToken, userAgent });
    }

    validateToken(token: JWT){
        const secretKey = token instanceof AccessToken ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
        try {
            return jwt.verify(token.token, secretKey) as JWTPayload;
        }
        catch (e) {
            throw new UnauthenticatedError('Bad Token');
        }
    }

    generateTokens(payload: JWTPayload){
        const accessToken = new AccessToken(payload);
        const refreshToken = new RefreshToken(payload);

        return {
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
        };
    }
    async generateTokensAndSetRefreshCookie(res: Response, payload: JWTPayload, userAgent: string){
        const tokens = this.generateTokens({ user: payload.user, role: payload.role });
        await this.saveToken(payload.user, tokens.refreshToken, userAgent);

        res.cookie('refreshToken', tokens.refreshToken, {
            expires: new Date(Date.now()),
            httpOnly: true,
            signed: true,
        });

        return tokens;
    }
}
