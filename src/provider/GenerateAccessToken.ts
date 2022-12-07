import { prisma } from "../lib/prisma";
import jwt from 'jsonwebtoken';

import { env } from "../env";

export class GenerateAccessToken {
    static async execute(userId: string) {
        const token = jwt.sign({
            id: userId
        }, env('JWT_SECRET')!)

        await prisma.session.create({
            data: {
                session_token: token,
                user_id: userId,
            }
        })

        return token;
    }
}
