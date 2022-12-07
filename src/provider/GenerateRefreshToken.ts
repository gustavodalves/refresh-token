import jwt from 'jsonwebtoken'
import { env } from '../env'
import { prisma } from '../lib/prisma';

export class GenerateRefreshToken {
    static async execute(userId: string): Promise<string> {
        const refreshToken = jwt.sign({}, env('JWT_SECRET_REFRESH')!);

        await prisma.refreshToken.create({
            data: {
                refresh_token: refreshToken,
                user_id: userId,
            }
        })

        return refreshToken;
    }
}
