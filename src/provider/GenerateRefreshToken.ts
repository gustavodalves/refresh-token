import jwt from 'jsonwebtoken'
import { env } from '../env'
import { Jwt } from '../lib/jwt';
import { prisma } from '../lib/prisma';

export class GenerateRefreshToken {
    static async execute(userId: string): Promise<string> {
        const refreshToken = Jwt.sign({}, env('JWT_SECRET_REFRESH')!, env('JWT_REFRESH_TOKEN_EXPIRES_IN_MS')!)

        await prisma.refreshToken.create({
            data: {
                refresh_token: refreshToken,
                user_id: userId,
            }
        })

        return refreshToken;
    }
}
