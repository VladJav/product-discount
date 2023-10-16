import JWT from "../jwt/JWT";
import {JwtPayload} from "jsonwebtoken";

export default class AccessToken extends JWT{

    constructor(payload: JwtPayload) {
        super(process.env.JWT_ACCESS_SECRET, payload, {expiresIn: '10m'});
    }
}