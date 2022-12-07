import { Request, Response } from "express";
import { AuthenticateUseCase } from "./AuthenticateUseCase";

export class AuthenticateController {
    static async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const user = await AuthenticateUseCase.execute({
            email,
            password
        })

        return response.status(200).json(user)
    }
}
