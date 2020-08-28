
export interface IPasswordEncoderService {
    encode(password: string): Promise<string>;
    matches(rawPassword: string, hash: string): boolean;
}