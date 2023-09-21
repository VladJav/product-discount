import {StatusCodes} from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

export default class UnauthenticatedError extends CustomAPIError {
    constructor(msg: string) {
        super(msg, StatusCodes.UNAUTHORIZED);
    }

}