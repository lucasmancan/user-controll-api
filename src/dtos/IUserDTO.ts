import { IPhoneDTO } from "./IPhoneDTO";

export interface IUserDTO {
    name: string;
    email: string;
    password: string;
    phones: IPhoneDTO[];
}

