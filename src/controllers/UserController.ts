
import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../services/IUserService'
import HttpStatusCodes from 'http-status-codes';

export class UserController {

    userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async signUp(request: Request, response: Response, next: NextFunction) {
        try {
            const createdUser = await this.userService.signUp(request.body);
            return response.status(HttpStatusCodes.CREATED).json(createdUser);
        } catch (error) {
            next(error);
        }
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        try {
            const authResponse = await this.userService.signIn(request.body);
            return response.status(HttpStatusCodes.OK).json(authResponse);
        } catch (error) {
            next(error);
        }
    }

    async findLoggedUser(request: Request, response: Response, next: NextFunction) {
        try {
            const usuario = await this.userService.findById(request.headers.userId.toString());
            return response.status(HttpStatusCodes.OK).json(usuario);
        } catch (error) {
            next(error);
        }
    }
}