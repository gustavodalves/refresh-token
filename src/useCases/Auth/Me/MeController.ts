import { Request, Response } from "express";
import { MeUseCase } from "./MeUseCase";

export class MeController {
    static async handle(request: Request, response: Response) {
        const { id } = request.body;

        const user = await MeUseCase.execute(id)

        return response.status(200).json(user)
    }
}