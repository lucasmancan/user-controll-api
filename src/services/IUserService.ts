import { IUserDTO } from '../dtos/IUserDTO';
import { ICredential } from '../dtos/ICredential';

export interface IUserService {
    signUp(dto: IUserDTO): Promise<any>;
    signIn(dto: ICredential): Promise<any>;
    findById(id: string): Promise<any>;
}