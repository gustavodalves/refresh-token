import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export class CreateUser {
    static async execute(request: Request, response: Response) {
        const createUserBody = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
        })
        try {            
            const { name, email, password } = createUserBody.parse(request.body);

            const userAlreadyExist = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(userAlreadyExist) {
                return response.status(400).json({
                    status: 400,
                    message: 'User already exists'
                })
            }
            
            const user = await prisma.user.create({
                data: {
                    name, email, password
                }
            })

            return response.status(201).send({
                ...user,
                password: undefined
            });
        } catch (err) {
            return response.status(500).send(err)
        }
    }
}
