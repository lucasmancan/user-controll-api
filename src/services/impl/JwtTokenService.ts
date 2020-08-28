import config from 'config';
import { ITokenService } from '../ITokenService';
import jwt from 'jsonwebtoken';

export class JwtTokenService implements ITokenService {
    async generate(payload: any): Promise<string> {
        return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: config.get("jwtExpiration") })
    }
    async decode(token: string): Promise<any> {
        return jwt.verify(token, config.get("jwtSecret"));
    }
}