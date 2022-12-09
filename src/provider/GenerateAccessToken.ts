import { prisma } from "../lib/prisma";
import jwt from 'jsonwebtoken';

import { env } from "../env";
import { Jwt } from "../lib/jwt";

export class GenerateAccessToken {
    static async execute(userId: string) {
        const token = Jwt.sign({ id: userId }, env('JWT_SECRET'), env('JWT_ACCESS_TOKEN_EXPIRES_IN_MS'))

        await prisma.session.create({
            data: {
                session_token: token,
                user_id: userId,
            }
        })

        return token;
    }
}
