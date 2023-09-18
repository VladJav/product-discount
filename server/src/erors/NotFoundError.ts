import {CustomAPIError} from "./index.js";
import {StatusCodes} from "http-status-codes";

export default class NotFoundError extends CustomAPIError {
    constructor(msg: string) {
        super(msg, StatusCodes.NOT_FOUND);
    }

}