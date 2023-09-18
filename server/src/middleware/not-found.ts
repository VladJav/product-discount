import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "../erors/index.js";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError('Route does not exists'));
};