import { HttpError } from 'http-errors';
import { Request, Response, NextFunction } from 'express';

// Middleware: Catches error and transforms it to a JSON response.
const errorHandler = () => (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: err.message,
  });

  next();
};

export default errorHandler;
