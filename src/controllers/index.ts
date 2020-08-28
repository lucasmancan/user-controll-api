import { userService } from '../services/';
import { UserController } from './UserController';

const userController = new UserController(userService);
export { userController };