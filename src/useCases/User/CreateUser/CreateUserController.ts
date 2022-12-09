import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    static async handle(request: Request, response: Response) {
        const { body } = request;

        const createdUserAndAuthenticated = await CreateUserUseCase.execute(body)

        return response.status(200).json(createdUserAndAuthenticated)
    }
}
