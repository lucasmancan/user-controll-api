import { ICredential } from "../../dtos/ICredential";
import { IUserDTO } from "../../dtos/IUserDTO";
import { IUserService } from "../IUserService";
import { IUserRepository } from '../../repositories/IUserRepository';
import { AuthenticationError } from '../../exceptions/AuthenticationError';
import { IUser } from '../../models/IUser';
import { ValidationError } from '../../exceptions/ValidationError';
import { IPasswordEncoderService } from "../IPasswordEncoderService";
import { ITokenService } from "../ITokenService";
import validator from 'validator'

export class UserService implements IUserService {

    userRepository: IUserRepository;
    passwordEncoder: IPasswordEncoderService;
    tokenService: ITokenService;

    constructor(repository: IUserRepository, passwordEncoder: IPasswordEncoderService, tokenService: ITokenService) {
        this.userRepository = repository;
        this.passwordEncoder= passwordEncoder;
        this.tokenService = tokenService;
    }

    async signUp(dto: IUserDTO): Promise<IUser> {

        if(!validator.isLength(dto.password, { min: 6 })){
            throw new ValidationError("Senha deve possuir no mínimo 6 caracteres.");
        }

        if(!validator.isEmail(dto.email)){
            throw new ValidationError("Digite um e-mail válido.");
        }

        const user = await this.userRepository.findByEmail(dto.email);

        if (user) {
            throw new ValidationError("E-mail já existe.");
        }
        
        dto.password = await this.passwordEncoder.encode(dto.password);

        const createdUser = await this.userRepository.save(dto);
        createdUser.logged_at = new Date();
        createdUser.token = await this.tokenService.generate({ userId: createdUser._id });

        return await this.userRepository.update(createdUser._id, createdUser);
    }

    async signIn(dto: ICredential): Promise<IUser> {
        const user = await this.userRepository.findByEmail(dto.email);

        if (!user || !(this.passwordEncoder.matches(dto.password, user.password))) {
            throw new AuthenticationError("Usuário e/ou senha inválidos");
        }

        user.logged_at = new Date();
        user.token = await this.tokenService.generate({ userId: user._id });

        return await this.userRepository.update(user._id, user);
    }

    async findById(id: string): Promise<IUser> {
        return await this.userRepository.findById(id);
    }
}