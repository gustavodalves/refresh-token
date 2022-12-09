import { Request, Response } from "express";
import { NotFoundError } from "../../../helpers/apiError";
import { prisma } from "../../../lib/prisma";

export class GetUserByIdUseCase {
    static async execute(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        })

        if(!user) {
            throw new NotFoundError("user not found")
        }

        return user
    }
}