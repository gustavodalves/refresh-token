import jwt from 'jsonwebtoken';

interface Payload {
    id?: string;
}

export class Jwt {
    static sign(payload: Payload, secret: string, expiresIn: string) {
        return jwt.sign(payload, secret, {
            expiresIn,
        });
    }

    static decode(token: string, secret: string) {
        return jwt.verify(token, secret);
    }
}
