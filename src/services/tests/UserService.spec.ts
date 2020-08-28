import { UserService } from '../impl/UserService';
import { IPasswordEncoderService } from '../IPasswordEncoderService';
import { ITokenService } from '../ITokenService';
import { JwtTokenService } from '../impl/JwtTokenService';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserController } from '../../controllers/UserController';

import { any, anyString, mock as mockJest, MockProxy } from 'jest-mock-extended';
import { IUser } from '../../models/IUser';
import { IUserDTO } from '../../dtos/IUserDTO';
import { copyFile } from 'fs';
import { IUserService } from '../IUserService';
import { ValidationError } from '../../exceptions/ValidationError';
import { ICredential } from '../../dtos/ICredential';

let repositoryMock: MockProxy<IUserRepository> = mockJest<IUserRepository>();
let passwordEncoderMock: MockProxy<IPasswordEncoderService> = mockJest<IPasswordEncoderService>();
let tokenServiceMock: MockProxy<ITokenService> = mockJest<ITokenService>();


function deepCopyUser(value: any): IUser {
    return (JSON.parse(JSON.stringify(value)));
}
describe('Sign-up', () => {

    it('should signup valid user', async () => {

        const requestBody: IUserDTO = {
            "email": "teste@gmail.com",
            "password": "123456",
            "name": "asdasda",
            "phones": [{ "area_code": 12, "number": 123123213 }, { "area_code": 2, "number": 123123213212 }]
        };

        const savedUser = { _id: "12321", created_at: new Date(), updated_at: new Date(), logged_at: new Date(), ...requestBody }
        const encodedPassword = "encodedPassword";
        const fakeToken = "fakeToken";

        passwordEncoderMock.encode.calledWith(anyString()).mockReturnValue(Promise.resolve(encodedPassword))
        tokenServiceMock.generate.calledWith(any()).mockReturnValue(Promise.resolve(fakeToken))
        repositoryMock.save.calledWith(any()).mockReturnValue(Promise.resolve(deepCopyUser(savedUser)));
        repositoryMock.update.calledWith(any(), any()).mockReturnValue(Promise.resolve(deepCopyUser({ ...savedUser, token: fakeToken })));

        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);
        const user = await userService.signUp(requestBody);

        expect(user.token).toEqual(fakeToken);
        expect(user).toEqual(deepCopyUser({ ...savedUser, token: fakeToken }));
    })

    it('should throw exception when validate an invalid user e-mail', async () => {

        const requestBody: IUserDTO = {
            "email": "invalid.com",
            "password": "123456",
            "name": "asdasda",
            "phones": [{ "area_code": 12, "number": 123123213 }, { "area_code": 2, "number": 123123213212 }]
        };

        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);
   
        try{
            await userService.signUp(requestBody);
        }catch(e){
            expect(e.message).toEqual("Digite um e-mail válido.");
        }
    })

    it('should throw exception when validate an invalid password length', async () => {

        const requestBody: IUserDTO = {
            "email": "invalid.com",
            "password": "123",
            "name": "asdasda",
            "phones": [{ "area_code": 12, "number": 123123213 }, { "area_code": 2, "number": 123123213212 }]
        };

        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);
   
        try{
            await userService.signUp(requestBody);
        }catch(e){
            expect(e.message).toEqual("Senha deve possuir no mínimo 6 caracteres.");
        }
    })
})

describe('Sign-in', () => {

    it('should signin valid user credential', async () => {

        const requestBody: ICredential = {
            "email": "teste@gmail.com",
            "password": "123456"
        };

        const fakeToken = "fakeToken";

        const user  = {
            "_id": "asdas",
            "email": "teste@gmail.com",
            "password": "123456",
            "name": "asdasda",
            "phones": [ { "area_code": 12, "number": 123123213 }, { "area_code": 2, "number": 123123213212 }], 
            token: fakeToken
        }

        passwordEncoderMock.matches.calledWith(anyString(), anyString()).mockReturnValue(true);
        tokenServiceMock.generate.calledWith(any()).mockReturnValue(Promise.resolve(fakeToken))
        repositoryMock.findByEmail.calledWith(any()).mockReturnValue(Promise.resolve(deepCopyUser(user)));
        repositoryMock.update.calledWith(any(), any()).mockReturnValue(Promise.resolve(deepCopyUser(user)));

        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);
        const signInUser = await userService.signIn(requestBody);

        expect(user.token).toEqual(fakeToken);
    })

    it('should throw exception when user credentials is wrong.', async () => {

        const requestBody: ICredential = {
            "email": "teste@gmail.com",
            "password": "123456"
        };
        repositoryMock.findByEmail.calledWith(any()).mockReturnValue(Promise.resolve(null));

        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);

        try{
            await userService.signIn(requestBody);
        }catch(e){
            expect(e.message).toEqual("Digite um e-mail válido.");
        }
    })

    it('should throw exception when user password is wrong.', async () => {

        const requestBody: ICredential = {
            "email": "teste@gmail.com",
            "password": "123456"
        };
    
        const user  = {
            "id": "asdas",
            "email": "teste@gmail.com",
            "password": "123456",
            "name": "asdasda",
            "phones": [{ "area_code": 12, "number": 123123213 }, { "area_code": 2, "number": 123123213212 }], token: "fakeToken"
        }

        passwordEncoderMock.matches.calledWith(anyString(), anyString()).mockReturnValue(false);
        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);

        try{
            await userService.signIn(requestBody);
        }catch(e){
            expect(e.message).toEqual("Usuário e/ou senha inválidos.");
        }
    })
})

describe('Find Active User', () => {

    it('should get active user', async () => {
        const user  = {
            "_id": "asdas",
            "email": "teste@gmail.com",
            "password": "123456",
            "name": "asdasda",
            "phones": [ { "area_code": 12, "number": 123123213 }, { "area_code": 2, "number": 123123213212 }], 
            token: "fakeToken"
        }

        repositoryMock.findById.calledWith(any()).mockReturnValue(Promise.resolve(deepCopyUser(user)));

        const userService = new UserService(repositoryMock, passwordEncoderMock, tokenServiceMock);
        const activeUSer = await userService.findById(user._id);

        expect(activeUSer).toEqual(user);
    })
})