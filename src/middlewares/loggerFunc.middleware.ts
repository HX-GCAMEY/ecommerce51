import { NextFunction, Request, Response } from 'express';

export function loggerFunc(req: Request, res: Response, next: NextFunction) {
  const getDate = () => {
    return new Date().toLocaleString('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires',
    });
  };

  console.log(`${req.method}/ ${req.url} - Request time: ${getDate()}`);

  next();
}
