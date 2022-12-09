import { Request, Response } from "express";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

export class GetUserByIdController {
    static async handle(request: Request, response: Response) {
        const { id } = request.params
        const user = await GetUserByIdUseCase.execute(id);

        return response.json(user)
    }
}