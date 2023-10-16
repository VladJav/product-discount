import {Token} from "../../models/Token";
import jwt, {JwtPayload} from "jsonwebtoken";
import {UnauthenticatedError} from "../../erors";
import {AccessToken, JWT, RefreshToken} from "../index";
import {Response} from "express";
import {MONTH} from "../../constants/time";

export default class JWTService {
    async saveRefreshToken(userId: string, refreshToken: string, userAgent: string){
        const token = await Token.findOne({ user: userId });
        if (token) {
            token.token = refreshToken;
            token.userAgent = userAgent;
            return token.save();
        }
        return Token.create({ user: userId, token: refreshToken, userAgent });
    }

    validateToken(token: JWT): JwtPayload;
    validateToken(token: string, secretKey: string): JwtPayload;
    validateToken(token: string | JWT, secretKey?: string): JwtPayload{
        if(secretKey && typeof token === 'string'){
            try {
                return jwt.verify(token, secretKey) as JwtPayload;
            }
            catch (e) {
                throw new UnauthenticatedError('Bad Token');
            }
        }
        else if(token instanceof JWT && !secretKey){
            const secretKey = token instanceof AccessToken ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
            try {
                return jwt.verify(token.token, secretKey) as JwtPayload;
            }
            catch (e) {
                throw new UnauthenticatedError('Bad Token');
            }
        }
        else{
            throw new Error();
        }
    }


    generateTokens(payload: JwtPayload){
        const accessToken = new AccessToken(payload);
        const refreshToken = new RefreshToken(payload);

        return {
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
        };
    }
    async generateTokensAndSetRefreshCookie(res: Response, payload: JwtPayload, userAgent: string){
        const tokens = this.generateTokens({ user: payload.user, role: payload.role });
        await this.saveRefreshToken(payload.user, tokens.refreshToken, userAgent);

        res.cookie('refreshToken', tokens.refreshToken, {
            expires: new Date(Date.now() + MONTH),
            httpOnly: true,
            signed: true,
        });

        return tokens;
    }
}