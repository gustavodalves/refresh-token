import { Response, Request } from "express";

import jwt from 'jsonwebtoken'
import { env } from "../../../env";
import { BadRequestError } from "../../../helpers/apiError";
import { prisma } from "../../../lib/prisma";
import { GenerateAccessToken } from "../../../provider/GenerateAccessToken";

interface RefreshTokenResponse {
    access_token: string;
}

export class RefreshTokenUseCase {
    static async execute(refresh_token: string): Promise<RefreshTokenResponse> {
        const token = await prisma.refreshToken.findUnique({
            where: {
                refresh_token,
            }
        })

        if(!token) {
            throw new BadRequestError('Invalid Token')
        }

        const generatedToken = await GenerateAccessToken.execute(token.user_id)

        return {
            access_token: generatedToken,
        };
    }
}