import { Request, Response } from "express";
import { MeUseCase } from "./MeUseCase";

export class MeController {
    static async handle(request: Request, response: Response) {
        const { user_id: userId } = request.body;

        const user = await MeUseCase.execute(userId)

        return response.status(200).json(user)
    }
}