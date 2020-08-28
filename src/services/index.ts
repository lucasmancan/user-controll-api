import { UserService } from "./impl/UserService";
import { userRepository } from '../repositories';
import { JwtTokenService } from './impl/JwtTokenService';
import { BCriptyPasswordEncoder } from './impl/BCriptyPasswordEncoder';

const jwtService = new JwtTokenService();
const passwordEncoder = new BCriptyPasswordEncoder();

const userService = new UserService(userRepository, passwordEncoder, jwtService);

export { userService, jwtService, passwordEncoder };