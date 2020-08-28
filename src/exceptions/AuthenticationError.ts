export class AuthenticationError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = message;
        this.status = 401;
      }
}