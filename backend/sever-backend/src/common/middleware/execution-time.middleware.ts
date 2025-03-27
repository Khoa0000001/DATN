import { Request, Response, NextFunction } from 'express';

export function ExecutionTimeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req['startTime'] = Date.now();
  next();
}
