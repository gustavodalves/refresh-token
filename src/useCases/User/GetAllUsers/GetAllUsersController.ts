import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

export class GetAllUsersController {
    static async handle(request: Request, response: Response) {
        const allUsers = await GetAllUsersUseCase.execute();

        return response.json(allUsers)
    }
}
