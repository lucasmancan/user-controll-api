import { Document } from "mongoose";
import { IPhone } from './IPhone';

export interface IUser extends Document {
    id: string;
    email: string;
    token: string;
    password: string;
    name: string,
    created_at: Date;
    updated_at: Date;
    logged_at: Date;
    phones: IPhone[];
}