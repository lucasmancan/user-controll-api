import { AuthenticationFilter } from './AuthenticationFilter';
import { jwtService } from '../../services/';

const authenticationFilter = new AuthenticationFilter(jwtService);

export { authenticationFilter };