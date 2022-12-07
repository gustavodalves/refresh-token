import { Response, Request } from "express";
import { BadRequestError } from "../../../helpers/apiError";
import { prisma } from "../../../lib/prisma";

export class MeUseCase {
    static async execute(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        })

        if(!user) {
            throw new BadRequestError('User not exists')
        }

        return user;
    }
}