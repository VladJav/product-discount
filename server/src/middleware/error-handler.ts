import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { CustomAPIError } from '../erors/index.js';

export const errorHandler = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {

    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: err.message || 'Something went wrong try again later',
    });
};
