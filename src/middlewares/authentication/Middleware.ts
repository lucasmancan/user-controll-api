import { Response, NextFunction, Request } from 'express';

export interface Middleware {
    handle(req: Request, res: Response, next: NextFunction) : void;
}