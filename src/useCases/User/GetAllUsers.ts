import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class GetAllUsers {
    static async execute(request: Request, response: Response) {
        const [users, countUsers] = await prisma.$transaction([
            prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                },
            }),
            prisma.user.count(),
        ])


        return response.status(200).json({
            count: countUsers,
            data: users,
        })
    }
}
