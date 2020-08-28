import { IUserRepository } from '../IUserRepository';
import { User } from '../../models/User';
import { IUser } from '../../models/IUser';

export class UserMongoRepository implements IUserRepository {
    update(id: string, user: any): Promise<IUser> {
        console.log(id, user)
        return User.findByIdAndUpdate({ _id: id }, user, { new: true }).exec();
    }
    save(user: any): Promise<IUser> {
        return User.create(user);
    }
    findByEmail(email: string): Promise<IUser> {
        return User.findOne({ email: email }).exec();
    }
    findById(id: string): Promise<IUser> {
        return User.findById(id).exec();
    }
}