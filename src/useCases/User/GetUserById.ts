import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class GetUserById {
    static async execute(request: Request, response: Response) {
        const { id } = request.params

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
            return response.status(404).json({
                message: 'user not found'
            })
        }

        return response.status(200).json(user)
    }
}