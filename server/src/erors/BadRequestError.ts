import {CustomAPIError} from "./index";
import {StatusCodes} from "http-status-codes";

export default class BadRequestError extends CustomAPIError {
    constructor(msg: string) {
        super(msg, StatusCodes.BAD_REQUEST);
    }

}