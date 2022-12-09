import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export class GetAllUsersUseCase {
    static async execute() {
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


        return {
            count: countUsers,
            data: users,
        }
    }
}
