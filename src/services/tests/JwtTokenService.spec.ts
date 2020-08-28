
import {JwtTokenService} from '../impl/JwtTokenService';

describe('Token Generator', () => {
    it('should generate token with claims', async () => {
        const token = await new JwtTokenService().generate({userId: 1});
        expect(token && token.length > 0).toBe(true)
    })
})

describe('Token Decoder', () => {

    let token = '';

    beforeEach(async () => {
        token = await new JwtTokenService().generate({userId: 1});
    });

    it('should decode token and check claims', async () => {
        const payload = await new JwtTokenService().decode(token);
        expect(payload.userId).toBe(1)
    })
})