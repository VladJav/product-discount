import {JwtPayload, sign} from "jsonwebtoken";

export default class JWT {
    private _payload: JwtPayload;
    private _token: string;

    get payload(): JwtPayload {
        return this._payload;
    }

    set payload(value: JwtPayload) {
        this._payload = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    constructor(secretKey: string, payload: JwtPayload, options?: object){
        this._token = sign(payload, secretKey, options);
        this._payload = payload;
    }
}
