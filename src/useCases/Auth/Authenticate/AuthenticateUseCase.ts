import bcrypt from "bcryptjs";
import { BadRequestError, NotFoundError } from "../../../helpers/apiError";

import { prisma } from "../../../lib/prisma";
import { GenerateAccessToken } from "../../../provider/GenerateAccessToken";
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";

interface UserRequest {
    email: string;
    password: string;
}

export class AuthenticateUseCase {
    static async execute({ email, password }: UserRequest) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(!user) {
            throw new NotFoundError('User not found');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword) {
            throw new BadRequestError('Invalid credentials')
        }

        const [ accessToken, refreshToken ] = await Promise.all([
            GenerateAccessToken.execute(user.id),
            GenerateRefreshToken.execute(user.id)
        ])
    
        return {
            refresh_token: refreshToken,
            session_token: accessToken,
        }
    }
}
