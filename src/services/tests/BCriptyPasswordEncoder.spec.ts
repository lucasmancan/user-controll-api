import {BCriptyPasswordEncoder} from '../impl/BCriptyPasswordEncoder';

describe('Password Encoder', () => {
    it('should encode password', async () => {
        const hash = await new BCriptyPasswordEncoder().encode("123");
        expect(hash !== "123").toBe(true)
    })
})

describe('Password Decoder', () => {
    let password = '';

    beforeEach(async () => {
        password =await new BCriptyPasswordEncoder().encode("123");
    });

    it('should check password', async () => {
        const match = await new BCriptyPasswordEncoder().matches("123", password);
        expect(match).toBe(true)
    })
})