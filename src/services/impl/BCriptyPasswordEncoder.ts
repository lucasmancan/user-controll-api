import { IPasswordEncoderService } from "../IPasswordEncoderService";
import bcrypt from 'bcryptjs';

export class BCriptyPasswordEncoder implements IPasswordEncoderService {
    async encode(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    
    matches(rawPassword: string, hash: string): boolean {
        return bcrypt.compareSync(rawPassword, hash);
    }
}