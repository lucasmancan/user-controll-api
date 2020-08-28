import { AuthenticationError } from "../../exceptions/AuthenticationError";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Response, Request } from 'express';
import config from 'config';

export class AuthenticationFilter {
    handle(req: Request, res: Response, next: any) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AuthenticationError("Não autorizado.");
        }

        const token = authHeader.split(" ")[1];

        try {
            const payload: any = jwt.verify(token, config.get("jwtSecret"))
            req.headers.userId = payload.userId;
            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError("Sessão inválida.");
            } else {
                throw new AuthenticationError("Autenticação inválida.");
            }
        }
    }
}