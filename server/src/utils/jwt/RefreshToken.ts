import JWT from "../jwt/JWT";
import {JwtPayload} from "jsonwebtoken";

export default class RefreshToken extends JWT{

    constructor(payload: JwtPayload) {
        super(process.env.JWT_REFRESH_SECRET, payload, {expiresIn: '30d'});
    }
}