import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { ZodError } from 'zod';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  // Log the error for debugging purposes
  console.error(error);

  if (error instanceof ZodError) {
    const message = error.errors.map(e => e.message).join(', ');
    error = new ApiError(400, message);
  }

  if (!(error instanceof ApiError)) {
    // Convert to ApiError if it's not already one
    const statusCode = 500;
    const message = 'Internal Server Error';
    error = new ApiError(statusCode, message, false);
  }

  res.status(error instanceof ApiError ? error.statusCode : 500).json({
    message: error.message,
    // Only send stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export default errorHandler;
