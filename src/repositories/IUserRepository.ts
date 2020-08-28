import { IUser } from '../models/IUser';

export interface IUserRepository {
    save(user: any): Promise<IUser>;
    update(id: string, user: any): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
}