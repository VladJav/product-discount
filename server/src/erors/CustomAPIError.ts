export default class CustomAPIError extends Error {
    private _statusCode: number;

    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }

    constructor(msg, statusCode) {
        super(msg);
        this._statusCode = statusCode;
    }
}