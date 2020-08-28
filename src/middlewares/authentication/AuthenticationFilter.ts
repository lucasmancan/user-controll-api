import { AuthenticationError } from "../../exceptions/AuthenticationError";
import { TokenExpiredError } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { ITokenService } from '../../services/ITokenService';
import { Middleware } from './Middleware';

export class AuthenticationFilter implements Middleware {
    tokenService: ITokenService;

    constructor(tokenService: ITokenService){
        this.tokenService = tokenService;
    }

   async  handle(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AuthenticationError("Não autorizado.");
        }

        const token = authHeader.split(" ")[1];

        try {
            const payload: any = await this.tokenService.decode(token);
            console.log(payload)
            req.headers.userId = payload.userId;
            next();
        } catch (error) {
            console.error(error);
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError("Sessão inválida.");
            } else {
                throw new AuthenticationError("Autenticação inválida.");
            }
        }
    }
}