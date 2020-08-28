
export interface ITokenService {
    generate(payload: any): Promise<any>;
    decode(token: string): Promise<any>;
}