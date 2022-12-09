import { z } from "zod";
import { BadRequestError } from "../../../helpers/apiError";
import { prisma } from "../../../lib/prisma";
import { GenerateAccessToken } from "../../../provider/GenerateAccessToken";
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";

interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    static async execute(request: CreateUserParams) {
        const createUserBody = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
        })          
            const { name, email, password } = createUserBody.parse(request);

            const userAlreadyExist = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(userAlreadyExist) {
                throw new BadRequestError('User already exists')
            }
            
            const user = await prisma.user.create({
                data: {
                    name, email, password
                }
            })

            const [ token, refreshToken ] = await Promise.all([
                GenerateAccessToken.execute(user.id),
                GenerateRefreshToken.execute(user.id),
            ])

        return {
            user,
            token,
            refresh_token: refreshToken,
        }
    }
}
